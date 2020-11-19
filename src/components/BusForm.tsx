import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import RNPickerSelect, { Item } from 'react-native-picker-select';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { inputUnderlineColors } from '../lib/constants';
import appStyles from '../styles/appStyle';
import registerStyles from '../styles/registerStyle';
import { Formik } from 'formik';
import { busSchema } from '../lib/validationShemas';
import FormErrorBox from './FormErrorBox';
import { callRepeatAlert } from '../lib/functions';
import { addBus, checkIfBusNumberIsUnique, getBusDriversWithoutBus, getBusTypes } from '../lib/api';
import LoadingScreen from './LoadingScreen';
import selectPickerStyles from '../styles/selectPickerStyles';

interface IProps {
  createHandler?: () => Promise<void>;
}

const BusForm = (props: IProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [busTypes, setBusTypes] = useState<Item[]>([]);
  const [busDrivers, setBusDrivers] = useState<Item[]>([]);
  const [selectedBusTypeId, setSelectedBusTypeId] = useState(0);
  const [selectedBusDriverId, setSelectedBusDriverId] = useState('');
  const [errorText, setErrorText] = useState('');

  const { createHandler } = props;

  const loadSelectPickersData = async () => {
    setIsLoading(true);
    const busDrivers = await getBusDriversWithoutBus();
    const busTypes = await getBusTypes();
    console.log(busDrivers, busTypes)
    setIsLoading(false);
    if (!busDrivers) {
      setErrorText('Не знайдено жодного вільного водія');
      return;
    }
    if (!busTypes) {
      setErrorText('Не знайдено жодного типу автобуса');
      return;
    }
    setBusDrivers(busDrivers.map((busDriver) => {
      return {
        label: `${busDriver.firstName} ${busDriver.lastName}`,
        value: busDriver.id,
      };
    }));
    setBusTypes(busTypes.map((busType) => {
      return {
        label: busType.name,
        value: busType.id,
      };
    }));
  }

  const createBus = async (values: any, _actions: any) => {
    const { name, seatsAmount, number } = values;
    if (!selectedBusTypeId) {
      setErrorText('Виберіть тип автобусу');
      return;
    }
    if (!selectedBusDriverId) {
      setErrorText('Виберіть водія');
      return;
    }
    setIsLoading(true);
    const checkResponse = await checkIfBusNumberIsUnique(number);
    if (!checkResponse) {
      setIsLoading(false);
      setErrorText('Автобус з таким номер вже існує');
      return;
    }
    const createResponse = await addBus(
      name,
      seatsAmount,
      number,
      selectedBusTypeId,
      selectedBusDriverId
    );
    setIsLoading(false);
    if (createResponse.error) {
      callRepeatAlert(
        () => createBus(values, _actions),
        'Не вдалося додати дані',
      );
      return;
    }
    if (createHandler) {
      await createHandler();
    }
  }

  useEffect(() => {
    (async () => loadSelectPickersData())();
  }, []);

  return isLoading ? <LoadingScreen /> : (
    <SafeAreaView>
      <ScrollView contentContainerStyle={appStyles.centeredContainer}>
        <Formik
          initialValues={{
            name: '',
            seatsAmount: '',
            number: '',
          }}
          validationSchema={busSchema}
          onSubmit={createBus}
        >
          {(formik) => (
            <View style={registerStyles.registerContainer}>
              <TextInput
                label='Назва автобусу'
                value={formik.values.name}
                onChangeText={formik.handleChange('name')}
                underlineColor={inputUnderlineColors.primary}
                right={<TextInput.Icon name='clipboard-text-outline' />}
                style={registerStyles.formFirstInput}
              />
              {(formik.touched.name && formik.errors.name) && (
                <FormErrorBox errorText={formik.errors.name} />
              )}
              <TextInput
                label='Кількість місць'
                value={formik.values.seatsAmount}
                keyboardType='number-pad'
                maxLength={2}
                onChangeText={formik.handleChange('seatsAmount')}
                underlineColor={inputUnderlineColors.primary}
                right={<TextInput.Icon name='seat-outline' />}
                style={registerStyles.formFirstInput}
              />
              {(formik.touched.seatsAmount && formik.errors.seatsAmount) && (
                <FormErrorBox errorText={formik.errors.seatsAmount} />
              )}
              <TextInput
                label='Номер автобусу'
                value={formik.values.number}
                keyboardType='number-pad'
                maxLength={4}
                onChangeText={formik.handleChange('number')}
                underlineColor={inputUnderlineColors.primary}
                right={<TextInput.Icon name='sort-numeric' />}
                style={registerStyles.formFirstInput}
              />
              {(formik.touched.number && formik.errors.number) && (
                <FormErrorBox errorText={formik.errors.number} />
              )}
              <View style={{alignItems: 'flex-end'}}>
                <RNPickerSelect
                  onValueChange={(value) => setSelectedBusTypeId(value)}
                  placeholder={{
                    label: 'Виберіть тип...',
                    value: null,
                  }}
                  items={busTypes}
                  style={selectPickerStyles}
                />
                <MaterialCommunityIcons name='arrow-down-drop-circle-outline' color='#5ca6f7' size={30} style={{position: 'relative', top: -40, right: 10}} />
              </View>
              <View style={{alignItems: 'flex-end'}}>
                <RNPickerSelect
                  onValueChange={(value) => setSelectedBusDriverId(value)}
                  placeholder={{
                    label: 'Виберіть водія...',
                    value: null,
                  }}
                  items={busDrivers}
                  style={selectPickerStyles}
                />
                <MaterialCommunityIcons name='arrow-down-drop-circle-outline' color='#5ca6f7' size={30} style={{position: 'relative', top: -40, right: 10}} />
              </View>
              <FormErrorBox errorText={errorText} />
              <Button
                uppercase={false}
                style={{...appStyles.buttonPrimary, ...registerStyles.registerButton}}
                onPress={formik.handleSubmit}
              >
                <Text style={appStyles.buttonPrimaryText}>
                  Додати
                </Text>
              </Button>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
}

export default BusForm;
  
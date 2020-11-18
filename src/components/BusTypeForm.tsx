import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Text, View, Image, Keyboard } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { inputUnderlineColors, workersDropdownData } from '../lib/constants';
import appStyles from '../styles/appStyle';
import registerStyles from '../styles/registerStyle';
import { Formik } from 'formik';
import { busTypeSchema, registerSchema } from '../lib/validationShemas';
import FormErrorBox from './FormErrorBox';
import { callRepeatAlert, formatDate, subtracDateYears } from '../lib/functions';
import { addBusType, login, register, registerWorker } from '../lib/api';
import LoadingScreen from './LoadingScreen';
import selectPickerStyles from '../styles/selectPickerStyles';
import Roles from '../lib/roles';

interface IProps {
  createHandler?: () => void;
}

const BusTypeForm = (props: IProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { createHandler } = props;

  const createBusType = async (values: any, _actions: any) => {
    const { name } = values;
    setIsLoading(true);
    const createResponse = await addBusType(name);
    setIsLoading(false);
    if (createResponse.error) {
      callRepeatAlert(
        () => createBusType(values, _actions),
        'Не вдалося додати дані',
      );
      return;
    }
    if (createHandler) {
      createHandler();
    }
  }

  return isLoading ? <LoadingScreen /> : (
    <SafeAreaView>
      <ScrollView contentContainerStyle={appStyles.centeredContainer}>
        <Formik
          initialValues={{
            name: '',
          }}
          validationSchema={busTypeSchema}
          onSubmit={createBusType}
        >
          {(formik) => (
            <View style={registerStyles.registerContainer}>
              <TextInput
                label='Назва типу'
                value={formik.values.name}
                onChangeText={formik.handleChange('name')}
                underlineColor={inputUnderlineColors.primary}
                right={<TextInput.Icon name='clipboard-text-outline' />}
                style={registerStyles.formFirstInput}
              />
              {(formik.touched.name && formik.errors.name) && (
                <FormErrorBox errorText={formik.errors.name} />
              )}
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

export default BusTypeForm;
  
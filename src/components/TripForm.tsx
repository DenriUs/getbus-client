import React, { useEffect, useState } from 'react';
import { Keyboard, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import RNPickerSelect, { Item } from 'react-native-picker-select';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { inputUnderlineColors, ukraineCities } from '../lib/constants';
import appStyles from '../styles/appStyle';
import registerStyles from '../styles/registerStyle';
import { Formik } from 'formik';
import { tripSchema } from '../lib/validationShemas';
import FormErrorBox from './FormErrorBox';
import { callRepeatAlert, formatDateTime } from '../lib/functions';
import { addTrip, getBusByDriverId, getBusDriversForTrip, getBusDriversWithoutBus } from '../lib/api';
import LoadingScreen from './LoadingScreen';
import selectPickerStyles from '../styles/selectPickerStyles';

interface IProps {
  createHandler?: () => Promise<void>;
}

const TripForm = (props: IProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [busDrivers, setBusDrivers] = useState<Item[]>([]);
  const [departureCities, setDepartureCities] = useState<Item[]>([]);
  const [arrivalCities, setArrivalCities] = useState<Item[]>([]);
  const [departureCity, setDepartureCity] = useState('');
  const [arrivalCity, setArrivalCity] = useState('');
  const [departureDateTime, setDepartureDateTime] = useState(new Date());
  const [arrivalDateTime, setArrivalDateTime] = useState(new Date());
  const [departureDate, setDepartureDate] = useState(new Date());
  const [arrivalDate, setArrivalDate] = useState(new Date());
  const [showDepartureDateTimePicker, setShowDepartureDateTimePicker] = useState(false);
  const [showArrivalDateTimePicker, setShowArrivalDateTimePicker] = useState(false);
  const [departureDateTimePickerMode, setDepartureDateTimePickerMode] = useState<'date' | 'time'>('date');
  const [arrivalDateTimePickerMode, setArrivalDateTimePickerMode] = useState<'date' | 'time'>('date');
  const [selectedBusDriverId, setSelectedBusDriverId] = useState('');
  const [availableSeatsNumber, setAvailableSeatsNumber] = useState(0);
  const [errorText, setErrorText] = useState('');

  const { createHandler } = props;

  const loadSelectPickersData = async () => {
    setIsLoading(true);
    const busDrivers = await getBusDriversForTrip();
    setIsLoading(false);
    if (!busDrivers) {
      setErrorText('Не знайдено жодного вільного водія');
      return;
    }
    setBusDrivers(busDrivers.map((busDriver) => {
      return {
        label: `${busDriver.firstName} ${busDriver.lastName}`,
        value: busDriver.id,
      };
    }));
    setDepartureCities(ukraineCities.map((ukraineCity, index) => {
      return {
        label: ukraineCity,
        value: index,
      };
    }));
    setArrivalCities(ukraineCities.map((ukraineCity, index) => {
      return {
        label: ukraineCity,
        value: index,
      };
    }));
  }

  const createTrip = async (values: any, _actions: any) => {
    let minutes = Math.round(Math.abs(arrivalDateTime.getTime() - departureDateTime.getTime()) / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    minutes %= 60;
    const { seatPrice } = values;
    if (!departureCity) {
      setErrorText('Виберіть місто відправки');
      return;
    }
    if (!arrivalCity) {
      setErrorText('Виберіть місто прибуття');
      return;
    }
    if (!selectedBusDriverId) {
      setErrorText('Виберіть водія');
      return;
    }
    if (departureCity === arrivalCity) {
      setErrorText('Міста не повинні співпадати');
      return;
    }
    setIsLoading(true);
    
    const createResponse = await addTrip(
      departureCity,
      arrivalCity,
      departureDateTime,
      arrivalDateTime,
      availableSeatsNumber,
      seatPrice,
      `${hours > 0 ? `${hours} год.` : '' } ${
        minutes > 0 ? minutes < 10 ? `0${minutes} хв.` : `${minutes} хв.` : ''
      }`,
      'Новий',
      selectedBusDriverId,
    );
    setIsLoading(false);
    if (createResponse.error) {
      callRepeatAlert(
        () => createTrip(values, _actions),
        'Не вдалося додати дані',
      );
      return;
    }
    if (createHandler) {
      await createHandler();
    }
  }

  const handleDepartureDateTimePickerChange = (
    formikSetFieldFunc: (field: string, value: any, shouldValidate?: boolean | undefined) => void,
    event: Event,
    selectedValue: Date | undefined
  ) => {
    setShowDepartureDateTimePicker(false);
    if(!selectedValue) {
      return;
    }
    if (event.type === 'set') {
      if (departureDateTimePickerMode === 'date') {
        setDepartureDate(selectedValue);
        setDepartureDateTimePickerMode('time');
        setShowDepartureDateTimePicker(true);
      } else {
        const dateTime = new Date(
          departureDate.getFullYear(),
          departureDate.getMonth(),
          departureDate.getDate(),
          selectedValue.getHours() + 2,
          selectedValue.getMinutes(),
          selectedValue.getSeconds(),
        );
        setDepartureDateTime(dateTime);
        formikSetFieldFunc('departureDateTime', formatDateTime(dateTime));
        setDepartureDateTimePickerMode('date');
      }
    }
  }

  const handleArrivalDateTimePickerChange = (
    formikSetFieldFunc: (field: string, value: any, shouldValidate?: boolean | undefined) => void,
    event: Event,
    selectedValue: Date | undefined
  ) => {
    setShowArrivalDateTimePicker(false);
    if(!selectedValue) {
      return;
    }
    if (event.type === 'set') {
      if (arrivalDateTimePickerMode === 'date') {
        setArrivalDate(selectedValue);
        setArrivalDateTimePickerMode('time');
        setShowArrivalDateTimePicker(true);
      } else {
        const dateTime = new Date(
          arrivalDate.getFullYear(),
          arrivalDate.getMonth(),
          arrivalDate.getDate(),
          selectedValue.getHours() + 2,
          selectedValue.getMinutes(),
          selectedValue.getSeconds(),
        );
        setArrivalDateTime(dateTime);
        formikSetFieldFunc('arrivalDateTime', formatDateTime(dateTime));
        setArrivalDateTimePickerMode('date');
      }
    }
  }

  const onDepartureFocus = () => {
    Keyboard.dismiss();
    setShowDepartureDateTimePicker(true);
  }

  const onArrivalFocus = () => {
    Keyboard.dismiss();
    setShowArrivalDateTimePicker(true);
  }
  
  const onDepartureBlur = () => setShowDepartureDateTimePicker(false);

  const onArrivalBlur = () => setShowArrivalDateTimePicker(false);

  const handleDriveSelectPickerChange = async (value: string) => {
    if (!value) {
      return;
    }
    setSelectedBusDriverId(value);
    const driverBus = await getBusByDriverId(value);
    setAvailableSeatsNumber(driverBus?.seatsAmount as number);
  }

  useEffect(() => {
    (async () => loadSelectPickersData())();
  }, []);

  return isLoading ? <LoadingScreen /> : (
    <SafeAreaView>
      <ScrollView contentContainerStyle={appStyles.centeredContainer}>
        <Formik
          initialValues={{
            departureDateTime: '',
            arrivalDateTime: '',
            seatPrice: '',
          }}
          validationSchema={tripSchema}
          onSubmit={createTrip}
        >
          {(formik) => (
            <View style={registerStyles.registerContainer}>
              <TextInput
                label='Дата та час відправки'
                value={formik.values.departureDateTime}
                onFocus={onDepartureFocus}
                onBlur={onDepartureBlur}
                underlineColor={inputUnderlineColors.primary}
                right={<TextInput.Icon name='clipboard-text-outline' />}
                style={registerStyles.formFirstInput}
              />
              {(formik.touched.departureDateTime && formik.errors.departureDateTime) && (
                <FormErrorBox errorText={formik.errors.departureDateTime} />
              )}
              <TextInput
                label='Дата та час прибуття'
                value={formik.values.arrivalDateTime}
                onFocus={onArrivalFocus}
                onBlur={onArrivalBlur}
                underlineColor={inputUnderlineColors.primary}
                right={<TextInput.Icon name='seat-outline' />}
                style={registerStyles.formFirstInput}
              />
              {(formik.touched.arrivalDateTime && formik.errors.arrivalDateTime) && (
                <FormErrorBox errorText={formik.errors.arrivalDateTime} />
              )}          
              <TextInput
                label='Ціна за місце (грн)'
                value={formik.values.seatPrice}
                keyboardType='number-pad'
                maxLength={4}
                onChangeText={formik.handleChange('seatPrice')}
                underlineColor={inputUnderlineColors.primary}
                right={<TextInput.Icon name='sort-numeric' />}
                style={registerStyles.formFirstInput}
              />
              {(formik.touched.seatPrice && formik.errors.seatPrice) && (
                <FormErrorBox errorText={formik.errors.seatPrice} />
              )}
              <Text style={{marginBottom: 20, color: '#ffffff'}}>
                К-ть доступних місць: {availableSeatsNumber}
              </Text>
              <View style={{alignItems: 'flex-end'}}>
                <RNPickerSelect
                  onValueChange={(value) => setDepartureCity(ukraineCities[value])}
                  placeholder={{
                    label: 'Виберіть місто відправки...',
                    value: null,
                  }}
                  items={departureCities}
                  style={selectPickerStyles}
                />
                <MaterialCommunityIcons name='arrow-down-drop-circle-outline' color='#5ca6f7' size={30} style={{position: 'relative', top: -40, right: 10}} />
              </View>
              <View style={{alignItems: 'flex-end'}}>
                <RNPickerSelect
                  onValueChange={(value) => setArrivalCity(ukraineCities[value])}
                  placeholder={{
                    label: 'Виберіть місто прибуття...',
                    value: null,
                  }}
                  items={arrivalCities}
                  style={selectPickerStyles}
                />
                <MaterialCommunityIcons name='arrow-down-drop-circle-outline' color='#5ca6f7' size={30} style={{position: 'relative', top: -40, right: 10}} />
              </View>
              <View style={{alignItems: 'flex-end'}}>
                <RNPickerSelect
                  onValueChange={handleDriveSelectPickerChange}
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
              {showDepartureDateTimePicker && (
                <DateTimePicker
                  timeZoneOffsetInMinutes={0}
                  value={departureDateTime}
                  mode={departureDateTimePickerMode}
                  minimumDate={new Date()}
                  is24Hour
                  onChange={(event, selectedDate) => {
                    handleDepartureDateTimePickerChange(formik.setFieldValue, event, selectedDate)
                  }}
                />
              )}
              {showArrivalDateTimePicker && (
                <DateTimePicker
                  timeZoneOffsetInMinutes={0}
                  value={arrivalDateTime}
                  mode={arrivalDateTimePickerMode}
                  minimumDate={new Date()}
                  is24Hour
                  onChange={(event, selectedDate) => {
                    handleArrivalDateTimePickerChange(formik.setFieldValue, event, selectedDate)
                  }}
                />
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

export default TripForm;
  
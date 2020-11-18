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
import { registerSchema } from '../lib/validationShemas';
import FormErrorBox from './FormErrorBox';
import { formatDate, subtracDateYears } from '../lib/functions';
import { login, register, registerWorker } from '../lib/api';
import LoadingScreen from './LoadingScreen';
import selectPickerStyles from '../styles/selectPickerStyles';
import Roles from '../lib/roles';
import { IUser, IUserFormUpdate } from '../lib/entities';

interface IProps {
  mode: 'user' | 'worker';
  navigation?: any;
  userInfo?: IUser;
  registerHandler?: () => Promise<void>;
}

const RegisterUserForm = (props: IProps) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [birthDate, setBirthDate] = useState(new Date());
  const [workerRole, setWorkerRole] = useState<Roles>();
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState('');

  const { mode, navigation, userInfo, registerHandler } = props;

  const onFocus = () => {
    Keyboard.dismiss();
    setShowDatePicker(true);
  }
  
  const onBlur = () => setShowDatePicker(false);

  const handleDateTimePickerChange = (
    formikSetFieldFunc: (field: string, value: any, shouldValidate?: boolean | undefined) => void,
    event: Event,
    selectedDate: Date | undefined
  ) => {
    setShowDatePicker(false);
    if(!selectedDate) {
      return;
    }
    if (event.type === 'set') {
      const formatedDate = formatDate(selectedDate);
      formikSetFieldFunc('birthDate', formatedDate);
      selectedDate.setHours(0, 0, 0, 0);
      setBirthDate(selectedDate);
    }
  }

  const handleSelectPickerChange = (value: number) => {
    if (!value) {
      return;
    }
    setWorkerRole(value);
  }

  const registerUser = async (values: any, _actions: any) => {
    const {
      firstName,
      lastName,
      password,
      email,
      passportNo,
      phoneNumber,
    } = values;
    setIsLoading(true);
    let registerResponse: any;
    if (mode === 'user') {
      registerResponse = await register(
        firstName,
        lastName,
        password,
        birthDate,
        email,
        passportNo,
        phoneNumber,
      );
    } else {
      if (!workerRole) {
        setIsLoading(false);
        setErrorText('Виберіть роль працівника');
        return;
      }
      registerResponse = await registerWorker(
        firstName,
        lastName,
        password,
        birthDate,
        email,
        passportNo,
        phoneNumber,
        workerRole,
      );
    }
    setIsLoading(false);
    if (registerResponse.error) {
      setErrorText(registerResponse.error.message);
      return;
    }
    if (registerHandler) {
      await registerHandler();
    }
    if (mode === 'worker') {
      return;
    }
    setIsLoading(true);
    const loginResponse = await login(email, password);
    setIsLoading(false);
    if (loginResponse.error) {
      navigation?.navigate('Login');
      return;
    }
    navigation?.navigate('Main');
  }

  const onSubmit = async (values: any, actions: any) => {
    values = {
      ...values,
      phoneNumber: `+380${values.phoneNumber}`,
    }
    await registerUser(values, actions);
  }

  return isLoading ? <LoadingScreen /> : (
    <SafeAreaView>
      <ScrollView contentContainerStyle={appStyles.centeredContainer}>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: '',
            birthDate: '',
            email: '',
            passportNo: '',
            phoneNumber: '',
          }}
          validationSchema={registerSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <View style={registerStyles.registerContainer}>
              <TextInput
                label="Ім'я"
                value={formik.values.firstName}
                onChangeText={formik.handleChange('firstName')}
                underlineColor={inputUnderlineColors.primary}
                right={<TextInput.Icon name='account-badge-outline' />}
                style={registerStyles.formFirstInput}
              />
              {(formik.touched.firstName && formik.errors.firstName) && (
                <FormErrorBox errorText={formik.errors.firstName} />
              )}
              <TextInput
                label='Призвіще'
                value={formik.values.lastName}
                onChangeText={formik.handleChange('lastName')}
                underlineColor={inputUnderlineColors.primary}
                right={<TextInput.Icon name='account-badge-outline' />}
                style={registerStyles.formInput}
              />
              {(formik.touched.lastName && formik.errors.lastName) && (
                <FormErrorBox errorText={formik.errors.lastName} />
              )}
              <TextInput
                label='Пароль'
                value={formik.values.password}
                onChangeText={formik.handleChange('password')}
                underlineColor={inputUnderlineColors.primary}
                right={<TextInput.Icon name='lock-outline' />}
                style={registerStyles.formInput}
              />
              {(formik.touched.password && formik.errors.password) && (
                <FormErrorBox errorText={formik.errors.password} />
              )}
              <TextInput
                label='Підтвердіть пароль'
                value={formik.values.confirmPassword}
                onChangeText={formik.handleChange('confirmPassword')}
                underlineColor={inputUnderlineColors.primary}
                right={<TextInput.Icon name='shield-lock-outline' />}
                style={registerStyles.formInput}
              />
              {(formik.touched.confirmPassword && formik.errors.confirmPassword) && (
                <FormErrorBox errorText={formik.errors.confirmPassword} />
              )}
              <TextInput
                label='Дата народження'
                value={formik.values.birthDate}
                onFocus={onFocus}
                onBlur={onBlur}
                underlineColor={inputUnderlineColors.primary}
                right={<TextInput.Icon name='calendar-month-outline' />}
                style={registerStyles.formInput}
              />
              {(formik.touched.birthDate && formik.errors.birthDate) && (
                <FormErrorBox errorText={`${formik.errors.birthDate}`} />
              )}
              {showDatePicker && (
                <DateTimePicker
                  value={birthDate}
                  mode='date'
                  maximumDate={subtracDateYears(new Date(), mode === 'user' ? 16 : 18)}
                  minimumDate={subtracDateYears(new Date(), 120)}
                  onChange={(event, selectedDate) => {
                    handleDateTimePickerChange(formik.setFieldValue, event, selectedDate)
                  }}
                />
              )}
              <TextInput
                label='Email'
                value={formik.values.email}
                onChangeText={formik.handleChange('email')}
                underlineColor={inputUnderlineColors.primary}
                right={<TextInput.Icon name='email-outline' />}
                style={registerStyles.formInput}
              />
              {(formik.touched.email && formik.errors.email) && (
                <FormErrorBox errorText={formik.errors.email} />
              )}
              <TextInput
                label='Номер паспорту'
                value={formik.values.passportNo}
                onChangeText={formik.handleChange('passportNo')}
                maxLength={9}
                keyboardType='phone-pad'
                underlineColor={inputUnderlineColors.primary}
                right={<TextInput.Icon name='passport-biometric' />}
                style={registerStyles.formInput}
              />
              {(formik.touched.passportNo && formik.errors.passportNo) && (
                <FormErrorBox errorText={formik.errors.passportNo} />
              )}
              <View style={{
                ...appStyles.flexContainer,
                ...registerStyles.phoneNumberInputContainer
              }}>
                <View style={{flexDirection: 'row', marginBottom: 10}}>
                  <Image source={require('../../assets/ukraineFlag.png')} />
                  <Text style={registerStyles.phoneNumberInputPrefix}>
                    +380
                  </Text>
                </View>
                <TextInput
                  label=' '
                  value={formik.values.phoneNumber}
                  onChangeText={formik.handleChange('phoneNumber')}
                  maxLength={9}
                  keyboardType='phone-pad'
                  underlineColor={inputUnderlineColors.primary}
                  right={<TextInput.Icon name='phone-outline' />}
                  style={{...registerStyles.formInput, ...registerStyles.phoneNumberInputWidth}}
                />
              </View>
              {(formik.touched.phoneNumber && formik.errors.phoneNumber) && (
                <FormErrorBox errorText={formik.errors.phoneNumber} />
              )}
              {mode === 'worker' && (
                <View style={{alignItems: 'flex-end'}}>
                  <RNPickerSelect
                    onValueChange={handleSelectPickerChange}
                    placeholder={{
                      label: 'Вииберіть роль...',
                      value: null,
                    }}
                    items={workersDropdownData}
                    style={selectPickerStyles}
                  />
                  <MaterialCommunityIcons name='arrow-down-drop-circle-outline' color='#5ca6f7' size={30} style={{position: 'relative', top: -40, right: 10}} />
                </View>
              )}
              <FormErrorBox errorText={errorText} />
              <Button
                uppercase={false}
                style={{...appStyles.buttonPrimary, ...registerStyles.registerButton}}
                onPress={formik.handleSubmit}
              >
                <Text style={appStyles.buttonPrimaryText}>
                  {mode === 'user' ? 'Зареєструватися' : 'Додати'}
                </Text>
              </Button>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
}

export default RegisterUserForm;
  
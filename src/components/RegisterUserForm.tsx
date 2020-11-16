import React, { MutableRefObject, useRef, useState } from 'react';
import { Text, View, Image, Keyboard } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { inputUnderlineColors } from '../lib/constants';
import appStyles from '../styles/appStyle';
import registerStyles from '../styles/registerStyle';
import { Formik } from 'formik';
import { registerSchema } from '../lib/validationShemas';
import FormErrorBox from './FormErrorBox';

interface IProps {
  onSubmit: () => void;
}

const RegisterUserForm = (props: IProps) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [birthDate, setBirthDate] = useState(new Date());

  const { onSubmit } = props;

  const onFocus = () => {
    Keyboard.dismiss();
    setShowDatePicker(true);
  }
  
  const onBlur = () => setShowDatePicker(false);

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${day < 10 ? `0${day}` : day }.${month < 10 ? `0${month}` : month }.${year}`;
  }

  const subtracDateYears = (date: Date, subtractNumber: number) => {
    date.setFullYear(date.getFullYear() - subtractNumber, date.getMonth(), date.getDate());
    return date;
  }

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
      setBirthDate(selectedDate);
    }
  }

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={appStyles.centeredContainer}>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: '',
            email: '',
            birthDate: '',
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
                <FormErrorBox fieldError={formik.errors.firstName} />
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
                <FormErrorBox fieldError={formik.errors.lastName} />
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
                <FormErrorBox fieldError={formik.errors.password} />
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
                <FormErrorBox fieldError={formik.errors.confirmPassword} />
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
                <FormErrorBox fieldError={`${formik.errors.birthDate}`} />
              )}
              {showDatePicker && (
                <DateTimePicker
                  value={birthDate}
                  mode='date'
                  maximumDate={subtracDateYears(new Date(), 16)}
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
                <FormErrorBox fieldError={formik.errors.email} />
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
                <FormErrorBox fieldError={formik.errors.phoneNumber} />
              )}
              <Button
                uppercase={false}
                style={{...appStyles.buttonPrimary, ...registerStyles.registerButton}}
                onPress={formik.handleSubmit}
              >
                <Text style={appStyles.buttonPrimaryText}>
                  Зареєструватися
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
  
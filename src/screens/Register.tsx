import React, { useState } from 'react';
import { View } from 'react-native';
import appStyles from '../styles/appStyle';
import LoadingSpinner from '../components/LoadingScreen';
import RegisterUserForm from '../components/RegisterUserForm';
import AppHeader from '../components/AppHeader';
import AppStatusBar from '../components/AppStatusBar';

interface IProps {
  navigation: any;
}

const Register = (props: IProps) => {
  const { navigation } = props;

  const navigateBack = () => navigation.goBack();

  return (
    <View style={appStyles.flexContainer}>
      <AppStatusBar />
      <AppHeader title='Реєстрація' handleBackActionPress={navigateBack} />
      <View style={appStyles.screenContainer}>
        <RegisterUserForm mode='user' navigation={navigation} />
      </View>
    </View>
  );
}

export default Register;

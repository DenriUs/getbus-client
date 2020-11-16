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
  const [isLoading, setIsLoading] = useState(false);

  const { navigation } = props;

  const navigateBack = () => navigation.goBack();

  const register = () => {
    navigateBack();
  }

  return isLoading ? <LoadingSpinner /> : (
    <View style={appStyles.flexContainer}>
      <AppStatusBar />
      <AppHeader handleBackActionPress={navigateBack} />
      <View style={appStyles.screenContainer}>
        <RegisterUserForm onSubmit={register} />
      </View>
    </View>
  );
}

export default Register;

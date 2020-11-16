import React, { useEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { appImages, inputUnderlineColors } from '../lib/constants';
import appStyles from '../styles/appStyle';
import loginStyles from '../styles/loginStyle';
import LoadingScreen from '../components/LoadingScreen';
import { checkLoginStatus, login, updateAxiosInstance } from '../lib/api';
import { Formik } from 'formik';
import FormErrorBox from '../components/FormErrorBox';
import AppStatusBar from '../components/AppStatusBar';

interface IProps {
  navigation: any;
}

const Login = (props: IProps) => {
  const [isPasswordSecured, setIsPasswordSecured] = useState(true);
  const [
    IsPasswordSecuredIconName,
    setIsPasswordSecuredIconName
  ] = useState<'lock-open-outline' | 'lock-outline'>('lock-outline');
  const [isLoading, setIsLoading] = useState(true);

  const { navigation } = props;

  const navigateRegister = () => navigation.navigate('Register');

  const changeIsPasswordSecured = () => {
    const iconName = isPasswordSecured ? 'lock-open-outline' : 'lock-outline';
    setIsPasswordSecuredIconName(iconName);
    setIsPasswordSecured(!isPasswordSecured);
  }

  const loginToAccount = async (values: any, actions: any) => {
    const { email, password } = values;
    const response = await login(email, password);
    navigation.navigate('Main');
  }

  useEffect(() => {
    (async () => {
      await updateAxiosInstance();
      const loginStatus = await checkLoginStatus();
      if (loginStatus) {
        setIsLoading(false);
        return;
      }
    })();
  }, []);

  return isLoading ? <LoadingScreen /> : (
    <View style={appStyles.flexContainer}>
      <AppStatusBar />
      <View style={appStyles.screenContainer}>
        <View style={{...appStyles.flexContainer, ...appStyles.centeredContainer}}>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            //validationSchema={loginSchema}
            onSubmit={loginToAccount}
          >
            {(formik) => (
              <View style={loginStyles.loginContainer}>
                <View style={appStyles.appTitleContainer}>
                  <Text style={appStyles.appTitle}>
                    Getbus
                  </Text>
                  <Image 
                    source={appImages.loginCircles}
                    style={appStyles.appTitleImage}
                  />
                </View>
                <TextInput
                  label='Email'
                  value={formik.values.email}
                  onChangeText={formik.handleChange('email')}
                  underlineColor={inputUnderlineColors.primary}
                  right={<TextInput.Icon name='email-outline' />}
                  style={loginStyles.formInput}
                />
                {((formik.touched.email && formik.errors.email) && (
                  <FormErrorBox fieldError={formik.errors.email} />
                ))}
                <TextInput
                  label='Пароль'
                  value={formik.values.password}
                  onChangeText={formik.handleChange('password')}
                  secureTextEntry={isPasswordSecured}
                  underlineColor={inputUnderlineColors.primary}
                  right={
                    <TextInput.Icon
                      name={IsPasswordSecuredIconName}
                      onPress={changeIsPasswordSecured}
                    />}
                  style={loginStyles.formInput}
                />
                {(formik.touched.password && formik.errors.password) && (
                  <FormErrorBox fieldError={formik.errors.password} />
                )}
                <Button
                  uppercase={false}
                  style={appStyles.buttonPrimary}
                  onPress={formik.handleSubmit}
                >
                  <Text style={appStyles.buttonPrimaryText}>
                    Увійти
                  </Text>
                </Button>
                <View style={loginStyles.registerQuestionContainer}>
                  <Text style={loginStyles.registerQuestionText}>
                    Новий користувач?
                  </Text>
                  <Button mode='text' uppercase={false} compact={true} onPress={navigateRegister}>
                    <Text style={loginStyles.registerButtonText}>
                      Реєстрація
                    </Text>
                  </Button>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </View>
  );
}

export default Login;

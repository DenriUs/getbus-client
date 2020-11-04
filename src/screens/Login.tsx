import React, { useState } from 'react';
import { StatusBar, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, TextInput } from 'react-native-paper';

interface IProps {
  navigation: any;
}

const Login = (props: IProps) => {
  const [isPasswordSecured, setIsPasswordSecured] = useState(true);
  const [IsPasswordSecuredIconName, setIsPasswordSecuredIconName] = useState<'lock-open-outline' | 'lock-outline'>('lock-outline');

  const { navigation } = props;

  const navigateRegister = () => navigation.navigate('Register');

  const changeIsPasswordSecured = () => {
    const iconName = isPasswordSecured ? 'lock-open-outline' : 'lock-outline';
    setIsPasswordSecuredIconName(iconName);
    setIsPasswordSecured(!isPasswordSecured);
  }

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor='#2b90ff' barStyle='light-content'/>
      <LinearGradient colors={['#2b90ff', '#5ca6f7', '#85bfff']} style={{flex: 1, alignItems: 'center'}}>    
        <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'transparent', width: '80%'}}>
          <Text style={{color: 'white', textAlign: 'center', top: -20, fontSize: 70, textShadowRadius: 20, textShadowOffset: { width: 0, height: 1}}}>
            GETBUS
          </Text>
          <TextInput
            label='Email'
            underlineColor='rgba(255, 255, 255, 0.5)'
            right={<TextInput.Icon name='email-outline' />}
            style={{marginBottom: 40}}
          />
          <TextInput
            label='Пароль'
            secureTextEntry={isPasswordSecured}
            underlineColor='rgba(255, 255, 255, 0.5)'
            right={<TextInput.Icon name={IsPasswordSecuredIconName} onPress={changeIsPasswordSecured} />}
            style={{marginBottom: 40}}
          />
          <Button style={{justifyContent: 'center', backgroundColor: 'white', height: 60, shadowRadius: 20, shadowOffset: { width: 0, height: 5}, elevation: 5}} uppercase={false}>
            <Text style={{color: '#2b90ff', fontSize: 15, letterSpacing: 0.5}}>
              Увійти
            </Text>
          </Button>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
            <Text style={{color: 'rgba(255, 255, 255, 0.6)'}}>
              Новий користувач?
            </Text>
            <Button mode='text' uppercase={false} compact={true} onPress={navigateRegister}>
              <Text style={{ letterSpacing: 0.5}}>
                Реєстрація
              </Text>
            </Button>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

export default Login;

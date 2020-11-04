import React, { useState } from 'react';
import { StatusBar, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Appbar, Button, TextInput } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

interface IProps {
  navigation: any;
}

const Register = (props: IProps) => { 
  const { navigation } = props;

  const navigateBack = () => navigation.goBack();

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor='#2b90ff' barStyle='light-content'/>
      <Appbar.Header dark={true} statusBarHeight={0} style={{backgroundColor: '#2b90ff', elevation: 0}}>
        <Appbar.BackAction onPress={navigateBack} />
        <Appbar.Content title="Реєстрація" />
      </Appbar.Header>
      <LinearGradient colors={['#2b90ff', '#5ca6f7', '#85bfff']} style={{flex: 1}}>
        <SafeAreaView>
          <ScrollView contentContainerStyle={{alignItems: 'center'}}>
            <View style={{width: '80%', marginTop: 30}}>
              <Text style={{color: 'white', textAlign: 'center', top: -30, fontSize: 70, textShadowRadius: 20, textShadowOffset: { width: 0, height: 1}}}>
                GETBUS
              </Text>
              <TextInput
                label="Ім'я"
                underlineColor='rgba(255, 255, 255, 0.5)'
                right={<TextInput.Icon name='account-badge-outline' />}
                style={{marginBottom: 20, marginTop: -30}}
              />
              <TextInput
                label='Призвіще'
                underlineColor='rgba(255, 255, 255, 0.5)'
                right={<TextInput.Icon name='account-badge-outline' />}
                style={{marginBottom: 20}}
              />
              <TextInput
                label='Пароль'
                underlineColor='rgba(255, 255, 255, 0.5)'
                right={<TextInput.Icon name='lock-outline' />}
                style={{marginBottom: 20}}
              />
              <TextInput
                label='Підтвердіть пароль'
                underlineColor='rgba(255, 255, 255, 0.5)'
                right={<TextInput.Icon name='lock-outline' />}
                style={{marginBottom: 20}}
              />
              <TextInput
                label='Email'
                underlineColor='rgba(255, 255, 255, 0.5)'
                right={<TextInput.Icon name='email-outline' />}
                style={{marginBottom: 20}}
              />
              <TextInput
                label='Номер телефону'
                underlineColor='rgba(255, 255, 255, 0.5)'
                right={<TextInput.Icon name='phone-outline' />}
                style={{marginBottom: 20}}
              />
              <Button style={{justifyContent: 'center', marginBottom: 30, shadowRadius: 20, shadowOffset: { width: 0, height: 5}, elevation: 5, backgroundColor: 'white', height: 60}} uppercase={false} labelStyle={{ letterSpacing: 0.5 }}>
                <Text style={{color: '#2b90ff', fontSize: 15 }}>
                  Зареєструватися
                </Text>
              </Button>
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

export default Register;

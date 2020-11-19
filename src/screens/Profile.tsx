import React, { useEffect, useState } from 'react';
import { View, Text, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CurvedBackground from '../components/CurvedBackground';
import AppStatusBar from '../components/AppStatusBar';
import appStyles from '../styles/appStyle';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, TouchableRipple } from 'react-native-paper';
import { getOwnInfo, logout } from '../lib/api';
import { IUser } from '../lib/entities';
import AppHeader from '../components/AppHeader';
import { callRepeatAlert, formatDate } from '../lib/functions';
import LoadingScreen from '../components/LoadingScreen';
import { useFocusEffect } from '@react-navigation/native';

interface IProps {
  navigation: any;
}

const Profile = (props: IProps) => {
  const [userInfo, setUserInfo] = useState<IUser>();
  const [isLoading, setIsLoading] = useState(false);

  const { navigation } = props;

  const handleLogout = async () => {
    await logout();
    navigation.navigate('Entry');
  }

  const loadProfileInfo = async () => {
    setIsLoading(true);
    const response = await getOwnInfo();
    if (!response) {
      setIsLoading(false);
      callRepeatAlert(loadProfileInfo, 'Не вдалося завантижити дані');
      return;
    }
    setUserInfo(response);
    setIsLoading(false);
  }

  useEffect(() => {
    (async () => loadProfileInfo())();
  }, []);

  return isLoading ? <LoadingScreen /> : (
    <SafeAreaView style={appStyles.flexContainer}>
      <AppStatusBar />
      <CurvedBackground />
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={appStyles.relativeFlexContainer}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <MaterialCommunityIcons name='account-circle' color='#ffffff' size={150} />
        </View>
        <View style={{flex: 2, padding: 20}}>
          <Card style={{marginBottom: 15, padding: 5, borderColor: '#5ca6f7', borderWidth: 1}}>
            <Card.Title title="Ім'я" subtitle={userInfo?.firstName } titleStyle={{color: '#000000'}}  subtitleStyle={{color: '#000000', fontSize: 16, fontFamily: 'sans-serif-light'}} />
          </Card>
          <Card style={{marginBottom: 15, padding: 5, borderColor: '#5ca6f7', borderWidth: 1}}>
            <Card.Title title='Прізвище' subtitle={userInfo?.lastName} titleStyle={{color: '#000000'}}  subtitleStyle={{color: '#000000', fontSize: 16, fontFamily: 'sans-serif-light'}} />
          </Card>
          <Card style={{marginBottom: 15, padding: 5, borderColor: '#5ca6f7', borderWidth: 1}}>
            <Card.Title title='Дата народження' subtitle={formatDate(userInfo?.birthDate as Date)} titleStyle={{color: '#000000'}}  subtitleStyle={{color: '#000000', fontSize: 16, fontFamily: 'sans-serif-light'}} />
          </Card>
          <Card style={{marginBottom: 15, padding: 5, borderColor: '#5ca6f7', borderWidth: 1}}>
            <Card.Title title='Email' subtitle={userInfo?.email} titleStyle={{color: '#000000'}}  subtitleStyle={{color: '#000000', fontSize: 16, fontFamily: 'sans-serif-light'}} />
          </Card>
          <Card style={{marginBottom: 15, padding: 5, borderColor: '#5ca6f7', borderWidth: 1}}>
            <Card.Title title='Номер телефону' subtitle={userInfo?.phoneNumber} titleStyle={{color: '#000000'}}  subtitleStyle={{color: '#000000', fontSize: 16, fontFamily: 'sans-serif-light'}} />
          </Card>
          <Card style={{marginBottom: 15, padding: 5, borderColor: '#5ca6f7', borderWidth: 1}}>
            <Card.Title title='Номер паспорту' subtitle={userInfo?.passportNo} titleStyle={{color: '#000000'}}  subtitleStyle={{color: '#000000', fontSize: 16, fontFamily: 'sans-serif-light'}} />
          </Card>
          <TouchableRipple
            rippleColor='rgba(0, 0, 0, 0.05)'
            onPress={handleLogout}
            style={{borderColor: '#5ca6f7', borderWidth: 1, padding: 10, alignItems: 'center', borderRadius: 7, marginTop: 10}}>
            <Text style={{fontSize: 17, color: '#5ca6f7'}}>Вихід</Text>
          </TouchableRipple>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Profile;

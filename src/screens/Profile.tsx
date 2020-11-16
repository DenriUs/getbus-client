import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CurvedBackground from '../components/CurvedBackground';
import AppStatusBar from '../components/AppStatusBar';
import appStyles from '../styles/appStyle';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, TouchableRipple } from 'react-native-paper';

const Profile = () => {

  return (
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
            <Card.Title title="Ім'я" subtitle='name' titleStyle={{color: '#000000'}}  subtitleStyle={{color: '#000000', fontSize: 16, fontFamily: 'sans-serif-light'}} />
          </Card>
          <Card style={{marginBottom: 15, padding: 5, borderColor: '#5ca6f7', borderWidth: 1}}>
            <Card.Title title='Прізвище' subtitle='lastName' titleStyle={{color: '#000000'}}  subtitleStyle={{color: '#000000', fontSize: 16, fontFamily: 'sans-serif-light'}} />
          </Card>
          <Card style={{marginBottom: 15, padding: 5, borderColor: '#5ca6f7', borderWidth: 1}}>
            <Card.Title title="Дата народження" subtitle='01.01.1970' titleStyle={{color: '#000000'}}  subtitleStyle={{color: '#000000', fontSize: 16, fontFamily: 'sans-serif-light'}} />
          </Card>
          <Card style={{marginBottom: 15, padding: 5, borderColor: '#5ca6f7', borderWidth: 1}}>
            <Card.Title title="Email" subtitle='email@email.com' titleStyle={{color: '#000000'}}  subtitleStyle={{color: '#000000', fontSize: 16, fontFamily: 'sans-serif-light'}} />
          </Card>
          <Card style={{marginBottom: 15, padding: 5, borderColor: '#5ca6f7', borderWidth: 1}}>
            <Card.Title title="Номер телефону" subtitle='+380000000000' titleStyle={{color: '#000000'}}  subtitleStyle={{color: '#000000', fontSize: 16, fontFamily: 'sans-serif-light'}} />
          </Card>
          <TouchableRipple
            rippleColor='rgba(0, 0, 0, 0.05)'
            onPress={() => console.log('12345')}
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

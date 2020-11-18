import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import appStyles from '../styles/appStyle';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, TouchableRipple } from 'react-native-paper';
import { IBus, IBusType } from '../lib/entities';

interface IProps {
  busInfo: IBus;
  deleteHandler: () => Promise<void>
}

const BusInfo = (props: IProps) => {
  const { busInfo, deleteHandler } = props;

  return (
    <SafeAreaView style={appStyles.flexContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={appStyles.relativeFlexContainer}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <MaterialCommunityIcons name='bus' color='#5ca6f7' size={150} />
        </View>
        <View style={{flex: 2, padding: 20}}>
          <Card style={{marginBottom: 15, padding: 5, borderColor: '#5ca6f7', borderWidth: 1}}>
            <Card.Title title='Назва' subtitle={busInfo.name} titleStyle={{color: '#000000'}}  subtitleStyle={{color: '#000000', fontSize: 16, fontFamily: 'sans-serif-light'}} />
          </Card>
          <Card style={{marginBottom: 15, padding: 5, borderColor: '#5ca6f7', borderWidth: 1}}>
            <Card.Title title='Кількість міцсь' subtitle={busInfo.seatsAmount} titleStyle={{color: '#000000'}}  subtitleStyle={{color: '#000000', fontSize: 16, fontFamily: 'sans-serif-light'}} />
          </Card>
          <Card style={{marginBottom: 15, padding: 5, borderColor: '#5ca6f7', borderWidth: 1}}>
            <Card.Title title='Номер' subtitle={busInfo.number} titleStyle={{color: '#000000'}}  subtitleStyle={{color: '#000000', fontSize: 16, fontFamily: 'sans-serif-light'}} />
          </Card>
          <Card style={{marginBottom: 15, padding: 5, borderColor: '#5ca6f7', borderWidth: 1}}>
            <Card.Title title='Тип автобуса' subtitle={busInfo.busType?.name} titleStyle={{color: '#000000'}}  subtitleStyle={{color: '#000000', fontSize: 16, fontFamily: 'sans-serif-light'}} />
          </Card>
          <Card style={{marginBottom: 15, padding: 5, borderColor: '#5ca6f7', borderWidth: 1}}>
            <Card.Title title='Водій' subtitle={`${busInfo.busDriver?.firstName} ${busInfo.busDriver?.lastName}`} titleStyle={{color: '#000000'}}  subtitleStyle={{color: '#000000', fontSize: 16, fontFamily: 'sans-serif-light'}} />
          </Card>
          <TouchableRipple
            rippleColor='rgba(0, 0, 0, 0.05)'
            onPress={deleteHandler}
            style={{borderColor: 'red', borderWidth: 1, padding: 10, alignItems: 'center', borderRadius: 7, marginTop: 10}}>
            <Text style={{fontSize: 17, color: 'red'}}>Видалити</Text>
          </TouchableRipple>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default BusInfo;

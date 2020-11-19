import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import appStyles from '../styles/appStyle';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, TouchableRipple } from 'react-native-paper';
import { ITrip } from '../lib/entities';
import { busSchema, tripSchema } from '../lib/validationShemas';
import { formatDateTime } from '../lib/functions';

interface IProps {
  tripInfo: ITrip;
  deleteHandler?: () => Promise<void>
  orderHandler?: () => Promise<void>
}

const TripInfo = (props: IProps) => {
  const { tripInfo, deleteHandler, orderHandler } = props;

  return (
    <SafeAreaView style={appStyles.flexContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={appStyles.relativeFlexContainer}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <MaterialCommunityIcons name='bus' color='#5ca6f7' size={150} />
        </View>
        <View style={{flex: 2, padding: 20}}>
          <Card style={{marginBottom: 15, padding: 5, borderColor: '#5ca6f7', borderWidth: 1}}>
            <Card.Title title='Місто відправки' subtitle={tripInfo.departureCity} titleStyle={{color: '#000000'}}  subtitleStyle={{color: '#000000', fontSize: 16, fontFamily: 'sans-serif-light'}} />
          </Card>
          <Card style={{marginBottom: 15, padding: 5, borderColor: '#5ca6f7', borderWidth: 1}}>
            <Card.Title title='Місто прибуття' subtitle={tripInfo.arrivalCity} titleStyle={{color: '#000000'}}  subtitleStyle={{color: '#000000', fontSize: 16, fontFamily: 'sans-serif-light'}} />
          </Card>
          <Card style={{marginBottom: 15, padding: 5, borderColor: '#5ca6f7', borderWidth: 1}}>
            <Card.Title title='Дата та час відправки' subtitle={formatDateTime(tripInfo.departureDateTime)} titleStyle={{color: '#000000'}}  subtitleStyle={{color: '#000000', fontSize: 16, fontFamily: 'sans-serif-light'}} />
          </Card>
          <Card style={{marginBottom: 15, padding: 5, borderColor: '#5ca6f7', borderWidth: 1}}>
            <Card.Title title='Дата та час прибуття' subtitle={formatDateTime(tripInfo.arrivalDateTime)} titleStyle={{color: '#000000'}}  subtitleStyle={{color: '#000000', fontSize: 16, fontFamily: 'sans-serif-light'}} />
          </Card>
          <Card style={{marginBottom: 15, padding: 5, borderColor: '#5ca6f7', borderWidth: 1}}>
            <Card.Title title='К-ть вільних місць:' subtitle={tripInfo.availableSeatsAmount} titleStyle={{color: '#000000'}}  subtitleStyle={{color: '#000000', fontSize: 16, fontFamily: 'sans-serif-light'}} />
          </Card>
          <Card style={{marginBottom: 15, padding: 5, borderColor: '#5ca6f7', borderWidth: 1}}>
            <Card.Title title='Ціна за місце:' subtitle={tripInfo.seatPrice} titleStyle={{color: '#000000'}}  subtitleStyle={{color: '#000000', fontSize: 16, fontFamily: 'sans-serif-light'}} />
          </Card>
          <Card style={{marginBottom: 15, padding: 5, borderColor: '#5ca6f7', borderWidth: 1}}>
            <Card.Title title='Час поїздки:' subtitle={tripInfo.tripTime} titleStyle={{color: '#000000'}}  subtitleStyle={{color: '#000000', fontSize: 16, fontFamily: 'sans-serif-light'}} />
          </Card>
          <Card style={{marginBottom: 15, padding: 5, borderColor: '#5ca6f7', borderWidth: 1}}>
            <Card.Title title='Статус:' subtitle={tripInfo.tripState} titleStyle={{color: '#000000'}}  subtitleStyle={{color: '#000000', fontSize: 16, fontFamily: 'sans-serif-light'}} />
          </Card>
          <Card style={{marginBottom: 15, padding: 5, borderColor: '#5ca6f7', borderWidth: 1}}>
            <Card.Title title='Водій' subtitle={`${tripInfo.busDriver?.firstName} ${tripInfo.busDriver?.lastName}`} titleStyle={{color: '#000000'}}  subtitleStyle={{color: '#000000', fontSize: 16, fontFamily: 'sans-serif-light'}} />
          </Card>
          {deleteHandler && (
            <TouchableRipple
              rippleColor='rgba(0, 0, 0, 0.05)'
              onPress={deleteHandler}
              style={{borderColor: 'red', borderWidth: 1, padding: 10, alignItems: 'center', borderRadius: 7, marginTop: 10}}>
              <Text style={{fontSize: 17, color: 'red'}}>Видалити</Text>
            </TouchableRipple>
          )}
          {orderHandler && (
            <TouchableRipple
              rippleColor='rgba(0, 0, 0, 0.05)'
              onPress={orderHandler}
              style={{borderColor: '#5ca6f7', borderWidth: 1, padding: 10, alignItems: 'center', borderRadius: 7, marginTop: 10}}>
              <Text style={{fontSize: 17, color: '#5ca6f7'}}>Купити</Text>
            </TouchableRipple>
          )}
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default TripInfo;

import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import { Button, Divider, TouchableRipple } from 'react-native-paper';
import { MaterialCommunityIcons, Fontisto } from '@expo/vector-icons';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import CurvedBackground from '../components/CurvedBackground';
import appStyles from '../styles/appStyle';
import AppStatusBar from '../components/AppStatusBar';
import AppBottomSheet from '../components/AppBottomSheet';
import { yearMonths } from '../lib/constants';
import Trip from '../components/Trip';
import { ScrollView } from 'react-native-gesture-handler';
import { subscribeToNavigationEvent, unsubscribeToNavigationEvent } from '../lib/functions';

interface IProps {
  navigation: any;
}

const SearchTickets = (props: IProps) => {
  const [departureCity, setDepartureCity] = useState('Вибрати →');
  const [arrivalCity, setArrivalCity] = useState('Вибрати →');
  const [departureDate, setDepartureDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { navigation } = props;
  
  const bottomSheetRef = useRef(null);

  const swapTripCities = () => {
    setDepartureCity(arrivalCity);
    setArrivalCity(departureCity);
  }

  const handleDateTimePickerChange = (event: Event, selectedDate: Date | undefined) => {
    setShowDatePicker(false);
    if(!selectedDate) {
      return;
    }
    if (event.type === 'set') {
      selectedDate.setHours(0, 0, 0, 0);
      setDepartureDate(selectedDate);
    }
  }

  const changeBottomSheetSnapToValue = (snapToValue: number) => {
    (bottomSheetRef as MutableRefObject<any>).current.snapTo(snapToValue);
  }

  const clearSearchScreen = () => {
    changeBottomSheetSnapToValue(2);
  }

  useEffect(() => {
    subscribeToNavigationEvent(navigation, 'blur', () => clearSearchScreen());
    return () => {
      unsubscribeToNavigationEvent(navigation, 'blur');
    };
  }, [])

  return (
    <View style={appStyles.flexContainer}>
      <AppStatusBar />
      <CurvedBackground />
      <View style={appStyles.relativeFlexContainer}>
        <View style={{...appStyles.centerAlignedContainer, marginTop: 40, flex: 1}}>
          <View style={{backgroundColor: 'rgba(255, 255, 255, 0.95)', flexDirection: 'row', justifyContent: 'space-between', width: '90%', borderRadius: 5}}>
            <View style={appStyles.fullWidth}>
              <TouchableRipple
                onPress={() => console.log('Pressed')}
                rippleColor='rgba(0, 0, 0, 0.1)'
              >
                <View style={{padding: 15}}>
                  <Text style={{fontSize: 12, color: 'rgba(0, 0, 0, 0.5)'}}>Звідки</Text>
                  <Text style={{fontSize: 20, color: 'rgba(0, 0, 0, 0.7)'}}>{departureCity}</Text>
                </View>
              </TouchableRipple>
              <Divider style={{width: '80%'}} />
              <TouchableRipple
                onPress={() => console.log('Pressed2')}
                rippleColor='rgba(0, 0, 0, 0.1)'
              >
                <View style={{padding: 15}}>
                  <Text style={{fontSize: 12, color: 'rgba(0, 0, 0, 0.5)'}}>Куди</Text>
                  <Text style={{fontSize: 20, color: 'rgba(0, 0, 0, 0.7)'}}>{arrivalCity}</Text>
                </View>
              </TouchableRipple>
            </View>
            <View>
              <Button style={{position: 'relative', right: 68, top: 47}} onPress={swapTripCities}>
                <MaterialCommunityIcons name='swap-vertical' size={35} color={'#5ca6f7'} />
              </Button>
            </View>
          </View>
          <View style={{backgroundColor: 'rgba(255, 255, 255, 0.95)', flexDirection: 'row', justifyContent: 'space-between', width: '90%', borderRadius: 5, marginTop: 10}}>
            <View style={appStyles.fullWidth}>
              <TouchableRipple
                onPress={() => setShowDatePicker(true)}
                rippleColor='rgba(0, 0, 0, 0.1)'
              >
                <View style={{padding: 15}}>
                  <Text style={{fontSize: 12, color: 'rgba(0, 0, 0, 0.5)'}}>Дата</Text>
                  <Text style={{fontSize: 20, color: 'rgba(0, 0, 0, 0.7)'}}>
                    {`${departureDate.getDate()} ${yearMonths[departureDate.getMonth()]}`}
                  </Text>
                </View>
              </TouchableRipple>
            </View>
            <View style={{position: 'relative', right: 50, top: 20}}>
              <MaterialCommunityIcons name='calendar-month-outline' size={30} color={'#5ca6f7'} />
            </View>
          </View>
          <View style={{backgroundColor: '#2b90ff', flexDirection: 'row', justifyContent: 'space-between', width: '90%', borderRadius: 5, marginTop: 10, elevation: 0, shadowRadius: 12, shadowOpacity: 0.4, shadowOffset: { width: 2, height: 2 }}}>
            <View style={appStyles.fullWidth}>
              <TouchableRipple
                onPress={() => changeBottomSheetSnapToValue(1)}
                rippleColor='rgba(0, 0, 0, 0.1)'
              >
                <View style={{padding: 15, alignItems: 'center'}}>
                  <Text style={{fontSize: 17, color: '#ffffff'}}>Знайти</Text>
                </View>
              </TouchableRipple>
            </View>
          </View>
          {showDatePicker && (
            <DateTimePicker
              value={departureDate}
              mode='date'
              maximumDate={new Date(new Date().setDate((new Date().getDate() + 180)))}
              minimumDate={new Date()}
              onChange={handleDateTimePickerChange}
            />
          )}
          <Fontisto name='bus-ticket' size={275} color={'#5ca6f7'} style={{marginTop: 50}} />
        </View>
        <AppBottomSheet content={
          <>
            <Text style={{fontSize: 17}}>Доступні рейси:</Text>
            <View style={{width: '100%', height: 1, borderRadius: 4, backgroundColor: 'rgba(0, 0, 0, 0.2)',}}></View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Trip mode='searching' />
            </ScrollView>
          </>
        } bottomSheetRef={bottomSheetRef} />
      </View>
   </View>
  );
}


export default SearchTickets;

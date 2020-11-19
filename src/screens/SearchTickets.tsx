import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { View, Text, Modal, FlatList, RefreshControl } from 'react-native';
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
import { callRepeatAlert, subscribeToNavigationEvent, unsubscribeToNavigationEvent } from '../lib/functions';
import AppHeader from '../components/AppHeader';
import CitiesSelect from '../components/CitiesSelect';
import { ITrip } from '../lib/entities';
import { getBusByDriverId, orderTicket, searchTrips } from '../lib/api';
import TripInfo from '../components/TripInfo';

interface IProps {
  navigation: any;
}

const SearchTickets = (props: IProps) => {
  const [departureCity, setDepartureCity] = useState('Вибрати →');
  const [arrivalCity, setArrivalCity] = useState('Вибрати →');
  const [departureDate, setDepartureDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDepartureSelectModal, setShowDepartureSelectModal] = useState(false);
  const [showArrivalSelectModal, setShowArrivalSelectModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showTripInfoModal, setShowTripInfoModal] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<ITrip>();
  const [trips, setTrips] = useState<ITrip[]>([]);

  const { navigation } = props;
  
  const bottomSheetRef = useRef(null);

  const swapTripCities = () => {
    setDepartureCity(arrivalCity);
    setArrivalCity(departureCity);
  }

  const closeInfoModal = () => {
    setSelectedTrip(undefined);
    setShowTripInfoModal(false);
  }

  const loadTrips = async () => {
    setIsRefreshing(true);
    const tripsList = await searchTrips(departureCity, arrivalCity, departureDate);
    console.log(tripsList);
    if (!tripsList) {
      callRepeatAlert(
        () => loadTrips(),
        'Сталася невідома помилка',
      )
      return;
    }
    setTrips(tripsList);
    setIsRefreshing(false);
  }

  const closeDepartureSelectModal = () => setShowDepartureSelectModal(false);

  const closeArrivalSelectModal = () => setShowArrivalSelectModal(false);

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

  const handleSearchPress = async () => {
    changeBottomSheetSnapToValue(1);
    loadTrips();
  }

  const handleTripPress = async (trip: ITrip) => {
    setSelectedTrip(trip);
    setShowTripInfoModal(true);
  }

  const renderTrips = trips.map((trip) => {
    return (
      <View key={trip.id}>
        <Trip mode='searching' tripInfo={trip} onPress={() => handleTripPress(trip)} />
      </View>
    );
  });

  const handleOrder = async () => {
    console.log(selectedTrip);
    if (!selectedTrip) {
      return;
    }
    await orderTicket(selectedTrip.seatPrice, selectedTrip.id);
    setShowTripInfoModal(false);
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
                onPress={() => setShowDepartureSelectModal(true)}
                rippleColor='rgba(0, 0, 0, 0.1)'
              >
                <View style={{padding: 15}}>
                  <Text style={{fontSize: 12, color: 'rgba(0, 0, 0, 0.5)'}}>Звідки</Text>
                  <Text style={{fontSize: 20, color: 'rgba(0, 0, 0, 0.7)'}}>{departureCity}</Text>
                </View>
              </TouchableRipple>
              <Divider style={{width: '80%'}} />
              <TouchableRipple
                onPress={() => setShowArrivalSelectModal(true)}
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
                onPress={handleSearchPress}
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
        <Modal animationType='slide' visible={showDepartureSelectModal} children={
          <>
            <AppHeader title='Місто відправки' handleBackActionPress={closeDepartureSelectModal} />
            <CitiesSelect handleCityPress={(city: string) => {
              setDepartureCity(city);
              setShowDepartureSelectModal(false);
            }} />
          </>
        }/>
        <Modal animationType='slide' visible={showArrivalSelectModal} children={
          <>
            <AppHeader title='Місто прибуття' handleBackActionPress={closeArrivalSelectModal} />
            <CitiesSelect handleCityPress={(city: string) => {
              setArrivalCity(city);
              setShowArrivalSelectModal(false);
            }} />
          </>
        }/>
        <AppBottomSheet content={
          <>
            <Text style={{fontSize: 17}}>Доступні рейси:</Text>
            <View style={{width: '100%', height: 1, borderRadius: 4, backgroundColor: 'rgba(0, 0, 0, 0.2)',}}></View>
            <ScrollView 
              showsVerticalScrollIndicator={false} 
              refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={loadTrips} />}>
              {renderTrips}
            </ScrollView>
          </>
        } bottomSheetRef={bottomSheetRef} />
        {selectedTrip && (
          <Modal animationType='slide' visible={showTripInfoModal} children={
            <>
              <AppHeader title='Інформація' handleBackActionPress={closeInfoModal} />
              <TripInfo tripInfo={selectedTrip} orderHandler={handleOrder} />
            </>
          }/>
        )}
      </View>
   </View>
  );
}


export default SearchTickets;

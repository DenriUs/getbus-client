import React, { useEffect, useState } from 'react';
import { FlatList, Modal, ScrollView, View } from 'react-native';
import CurvedBackground from '../components/CurvedBackground';
import AppStatusBar from '../components/AppStatusBar';
import appStyles from '../styles/appStyle';
import { FAB } from 'react-native-paper';
import Bus from '../components/Bus';
import { callRepeatAlert } from '../lib/functions';
import { IBus, ITrip } from '../lib/entities';
import { deleteBus, getBusByDriverId, getBuses, getInProgressTrips, getTrips } from '../lib/api';
import AppHeader from '../components/AppHeader';
import BusForm from '../components/BusForm';
import BusInfo from '../components/BusInfo';
import Trip from '../components/Trip';
import TripForm from '../components/TripForm';
import TripInfo from '../components/TripInfo';

const InProgressTrips = () => {
  const [trips, setTrips] = useState<ITrip[]>();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTripInfoModal, setShowTripInfoModal] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<ITrip>();
  const [selectedTripBusName, setSelectedTripBusName] = useState('');

  const closeInfoModal = () => {
    setSelectedTrip(undefined);
    setShowTripInfoModal(false);
  }

  const loadInProgressTrips = async () => {
    setIsRefreshing(true);
    const tripsList = await getInProgressTrips();
    if (!tripsList) {
      callRepeatAlert(loadInProgressTrips, 'Не вдалося завантижити дані');
      setIsRefreshing(false);
      return;
    }
    setTrips(tripsList);
    setIsRefreshing(false);
  }

  const handleTripPress = async (trip: ITrip) => {
    setSelectedTrip(trip);
    setShowTripInfoModal(true);
  }

  useEffect(() => {
    (async () => loadInProgressTrips())();
  }, []);

  return (  
    <View style={appStyles.flexContainer}>
      <AppStatusBar />
      <View style={appStyles.relativeFlexContainer}>
        <CurvedBackground />
        <View style={{...appStyles.relativeFlexContainer, padding: 10}}>
          <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={trips}
            refreshing={isRefreshing} 
            onRefresh={async () => await loadInProgressTrips()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Trip onPress={() => handleTripPress(item)} mode='worker' tripInfo={item} />
            )}
          />
          {selectedTrip && (
            <Modal animationType='slide' visible={showTripInfoModal} children={
              <>
                <AppHeader title='Інформація' handleBackActionPress={closeInfoModal} />
                <TripInfo tripInfo={selectedTrip} />
              </>
            }/>
          )}
        </View>
      </View>
    </View>
  );
}

export default InProgressTrips;

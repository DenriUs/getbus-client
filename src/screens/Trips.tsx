import React, { useEffect, useState } from 'react';
import { FlatList, Modal, ScrollView, View } from 'react-native';
import CurvedBackground from '../components/CurvedBackground';
import AppStatusBar from '../components/AppStatusBar';
import appStyles from '../styles/appStyle';
import { FAB } from 'react-native-paper';
import Bus from '../components/Bus';
import { callRepeatAlert } from '../lib/functions';
import { IBus, ITrip } from '../lib/entities';
import { deleteBus, deleteTrip, getBusByDriverId, getBuses, getTrips } from '../lib/api';
import AppHeader from '../components/AppHeader';
import BusForm from '../components/BusForm';
import BusInfo from '../components/BusInfo';
import Trip from '../components/Trip';
import TripForm from '../components/TripForm';
import TripInfo from '../components/TripInfo';

const Trips = () => {
  const [trips, setTrips] = useState<ITrip[]>();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTripInfoModal, setShowTripInfoModal] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<ITrip>();

  const closeCreateModal = () => setShowCreateModal(false);
  const closeInfoModal = () => {
    setSelectedTrip(undefined);
    setShowTripInfoModal(false);
  }

  const loadTrips = async () => {
    setIsRefreshing(true);
    const tripsList = await getTrips();
    if (!tripsList) {
      callRepeatAlert(loadTrips, 'Не вдалося завантижити дані');
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

  const handleDelete = async () => {
    if (selectedTrip) {
      const response = await deleteTrip(selectedTrip.id);
      if (response.error) {
        callRepeatAlert(
          loadTrips,
          'Не вдалося видалити дані, перевірте чи не належить цей тип до якогось автобуса'
        );
      }
      setShowTripInfoModal(false);
      await loadTrips();
    }
  }

  useEffect(() => {
    (async () => loadTrips())();
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
            onRefresh={async () => await loadTrips()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Trip onPress={() => handleTripPress(item)} mode='worker' tripInfo={item} />
            )}
          />
          <Modal animationType='slide' visible={showCreateModal} children={
            <>
              <AppHeader title='Додати рейс' handleBackActionPress={closeCreateModal} />
              <View style={appStyles.screenContainer}>
                <TripForm
                  createHandler={async () => {
                    setShowCreateModal(false);
                    await loadTrips()}
                  }
                />
              </View>
            </>
          }/>
          {selectedTrip && (
            <Modal animationType='slide' visible={showTripInfoModal} children={
              <>
                <AppHeader title='Інформація' handleBackActionPress={closeInfoModal} />
                <TripInfo tripInfo={selectedTrip} deleteHandler={handleDelete} />
              </>
            }/>
          )}
          <FAB
            style={{position: 'absolute', margin: 16, right: 0, bottom: 0}} 
            icon="plus"
            onPress={() => setShowCreateModal(true)}
          />
        </View>
      </View>
    </View>
  );
}

export default Trips;

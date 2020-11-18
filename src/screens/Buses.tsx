import React, { useEffect, useState } from 'react';
import { FlatList, Modal, ScrollView, View } from 'react-native';
import CurvedBackground from '../components/CurvedBackground';
import AppStatusBar from '../components/AppStatusBar';
import appStyles from '../styles/appStyle';
import { FAB } from 'react-native-paper';
import Bus from '../components/Bus';
import { callRepeatAlert } from '../lib/functions';
import { IBus } from '../lib/entities';
import { deleteBus, getBuses } from '../lib/api';
import AppHeader from '../components/AppHeader';
import BusForm from '../components/BusForm';
import BusInfo from '../components/BusInfo';

const Buses = () => {
  const [buses, setBuses] = useState<IBus[]>();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showBusInfoModal, setShowBusInfoModal] = useState(false);
  const [selectedBus, setSelectedBus] = useState<IBus>();

  const closeCreateModal = () => setShowCreateModal(false);
  const closeInfoModal = () => {
    setSelectedBus(undefined);
    setShowBusInfoModal(false);
  }

  const loadBuses = async () => {
    setIsRefreshing(true);
    const busTypesList = await getBuses();
    if (!busTypesList) {
      callRepeatAlert(loadBuses, 'Не вдалося завантижити дані');
      setIsRefreshing(false);
      return;
    }
    setBuses(busTypesList);
    setIsRefreshing(false);
  }

  const handleBusPress = (bus: IBus) => {
    setSelectedBus(bus);
    setShowBusInfoModal(true);
  }

  const handleDelete = async () => {
    if (selectedBus) {
      const response = await deleteBus(selectedBus.id);
      if (response.error) {
        callRepeatAlert(
          loadBuses,
          'Не вдалося видалити дані, перевірте чи не належить цей тип до якогось автобуса'
        );
      }
      setShowBusInfoModal(false);
      await loadBuses();
    }
  }

  useEffect(() => {
    (async () => loadBuses())();
  }, []);

  return (  
    <View style={appStyles.flexContainer}>
      <AppStatusBar />
      <View style={appStyles.relativeFlexContainer}>
        <CurvedBackground />
        <View style={{...appStyles.relativeFlexContainer, padding: 10}}>
          <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={buses}
            refreshing={isRefreshing} 
            onRefresh={async () => await loadBuses()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Bus onPress={() => handleBusPress(item)} busName={item.name} number={item.number} />
            )}
          />
          <Modal animationType='slide' visible={showCreateModal} children={
            <>
              <AppHeader title='Додати автобус' handleBackActionPress={closeCreateModal} />
              <View style={appStyles.screenContainer}>
                <BusForm
                  createHandler={async () => {
                    setShowCreateModal(false);
                    await loadBuses()}
                  }
                />
              </View>
            </>
          }/>
          {selectedBus && (
            <Modal animationType='slide' visible={showBusInfoModal} children={
              <>
                <AppHeader title='Інформація' handleBackActionPress={closeInfoModal} />
                <BusInfo busInfo={selectedBus} deleteHandler={handleDelete} />
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

export default Buses;

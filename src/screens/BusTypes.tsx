import React, { useEffect, useState } from 'react';
import { View, FlatList, Modal } from 'react-native';
import CurvedBackground from '../components/CurvedBackground';
import AppStatusBar from '../components/AppStatusBar';
import appStyles from '../styles/appStyle';
import { FAB } from 'react-native-paper';
import { IBusType } from '../lib/entities';
import { deleteBusType, getBusTypes } from '../lib/api';
import { callRepeatAlert} from '../lib/functions';
import AppHeader from '../components/AppHeader';
import BusType from '../components/BusType';
import BusTypeInfo from '../components/BusTypeInfo';
import BusTypeForm from '../components/BusTypeForm';

const BusTypes = () => {
  const [busTypes, setBusTypes] = useState<IBusType[]>();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showBusTypeInfoModal, setShowBusTypeInfoModal] = useState(false);
  const [selectedBusType, setSelectedBusType] = useState<IBusType>();

  const closeCreateModal = () => setShowCreateModal(false);
  const closeInfoModal = () => {
    setSelectedBusType(undefined);
    setShowBusTypeInfoModal(false);
  }

  const loadBusTypes = async () => {
    setIsRefreshing(true);
    const busTypesList = await getBusTypes();
    if (!busTypesList) {
      callRepeatAlert(loadBusTypes, 'Не вдалося завантижити дані');
      setIsRefreshing(false);
      return;
    }
    setBusTypes(busTypesList);
    setIsRefreshing(false);
  }

  const handleBusTypePress = (busType: IBusType) => {
    setSelectedBusType(busType);
    setShowBusTypeInfoModal(true);
  }

  const handleDelete = async () => {
    if (selectedBusType) {
      const response = await deleteBusType(selectedBusType.id);
      setShowBusTypeInfoModal(false);
      if (response.error) {
        callRepeatAlert(
          handleDelete,
          'Не вдалося видалити дані, перевірте чи не належить цей тип до якогось автобуса'
        );
        return;
      }
      await loadBusTypes();
    }
  }

  useEffect(() => {
    (async () => loadBusTypes())();
  }, []);

  return (  
    <View style={appStyles.flexContainer}>
      <AppStatusBar />
      <View style={appStyles.relativeFlexContainer}>
        <CurvedBackground />
        <View style={{...appStyles.relativeFlexContainer, padding: 10}}>
          <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={busTypes}
            refreshing={isRefreshing} 
            onRefresh={async () => await loadBusTypes()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <BusType onPress={() => handleBusTypePress(item)} name={item.name} />
            )}
          />
          <Modal animationType='slide' visible={showCreateModal} children={
            <>
              <AppHeader title='Додати тип автобусу' handleBackActionPress={closeCreateModal} />
              <View style={appStyles.screenContainer}>
                <BusTypeForm
                  createHandler={async () => {
                    setShowCreateModal(false);
                    await loadBusTypes()}
                  }
                />
              </View>
            </>
          }/>
          {selectedBusType && (
            <Modal animationType='slide' visible={showBusTypeInfoModal} children={
              <>
                <AppHeader title='Інформація' handleBackActionPress={closeInfoModal} />
                <BusTypeInfo busTypeInfo={selectedBusType} deleteHandler={handleDelete} />
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

export default BusTypes;

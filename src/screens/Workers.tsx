import React, { useState } from 'react';
import { ScrollView, View, Text, RefreshControl, FlatList, Modal } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CurvedBackground from '../components/CurvedBackground';
import AppStatusBar from '../components/AppStatusBar';
import appStyles from '../styles/appStyle';
import { FAB } from 'react-native-paper';
import Worker from '../components/Worker';
import { workersDropdownData } from '../lib/constants';
import selectPickerStyles from '../styles/selectPickerStyles';
import Roles from '../lib/roles';
import { IUser } from '../lib/entities';
import { deleteWorker, getUsersInRole } from '../lib/api';
import { callRepeatAlert, getDifferenceBetweenDatesInYears, subtracDateYears } from '../lib/functions';
import RegisterUserForm from '../components/RegisterUserForm';
import AppHeader from '../components/AppHeader';
import WorkerInfo from '../components/WorkerInfo';

const Workers = () => {
  const [workersRole, setWorkersRole] = useState<Roles>();
  const [workers, setWorkers] = useState<IUser[]>();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showWorkerInfoModal, setShowWorkerInfoModal] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<IUser>();

  const closeCreateModal = () => setShowCreateModal(false);
  const closeInfoModal = () => {
    setSelectedWorker(undefined);
    setShowWorkerInfoModal(false);
  }

  const loadWorkersInRole = async (role: Roles) => {
    setIsRefreshing(true);
    if (!role) {
      setIsRefreshing(false);
      return;
    }
    const workersList = await getUsersInRole(role);
    if (!workersList) {
      callRepeatAlert(
        () => loadWorkersInRole(workersRole as Roles),
        'Не вдалося завантижити дані',
      );
      setIsRefreshing(false);
      return;
    }
    setWorkers(workersList);
    setIsRefreshing(false);
  }

  const handleSelectPickerChange = async (value: number) => {
    if (!value) {
      setWorkers([]);
      return;
    }
    setWorkersRole(value);
    await loadWorkersInRole(value);
  }

  const handleWorkerPress = (worker: IUser) => {
    setSelectedWorker(worker);
    setShowWorkerInfoModal(true);
  }

  const handleDelete = async () => {
    if (selectedWorker) {
      const response = await deleteWorker(selectedWorker.id);
      setShowWorkerInfoModal(false);
      if (response.error) {
        callRepeatAlert(() => 
        handleDelete(),
        'Не вдалося видалити робітника',);
        return;
      }
      if (workersRole) {
        await loadWorkersInRole(workersRole)
      }
    }
  }

  return (  
    <View style={appStyles.flexContainer}>
      <AppStatusBar />
      <View style={appStyles.relativeFlexContainer}>
        <CurvedBackground />
        <View style={{...appStyles.relativeFlexContainer, padding: 10}}>
          <View style={{alignItems: 'flex-end'}}>
            <RNPickerSelect
              onValueChange={async (value: number) => await handleSelectPickerChange(value)}
              placeholder={{
                label: 'Виберіть роль...',
                value: null,
              }}
              items={workersDropdownData}
              style={selectPickerStyles}
            />
            <MaterialCommunityIcons name='arrow-down-drop-circle-outline' color='#5ca6f7' size={30} style={{position: 'relative', top: -40, right: 10}} />
          </View>
          <FlatList
            keyExtractor={(item) => item.id}
            data={workers}
            refreshing={isRefreshing} 
            onRefresh={async () => await loadWorkersInRole(workersRole as Roles)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Worker
                onPress={() => handleWorkerPress(item)}
                fullName={`${item.firstName} ${item.lastName}`}
                age={getDifferenceBetweenDatesInYears(new Date(), item.birthDate)} 
                role={item.role}
              />
            )}
          />
          <Modal animationType='slide' visible={showCreateModal} children={
            <>
              <AppHeader title='Додати працівника' handleBackActionPress={closeCreateModal} />
              <View style={appStyles.screenContainer}>
                <RegisterUserForm 
                  mode='worker' 
                  registerHandler={async () => {
                    setShowCreateModal(false);
                    await loadWorkersInRole(workersRole as Roles)}
                  }
                />
              </View>
            </>
          }/>
          {selectedWorker && (
            <Modal animationType='slide' visible={showWorkerInfoModal} children={
              <>
                <AppHeader title='Інформація' handleBackActionPress={closeInfoModal} />
                <WorkerInfo userInfo={selectedWorker} deleteHandler={handleDelete} />
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

export default Workers;

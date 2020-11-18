import React, { useEffect, useState } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SearchTickets from '../screens/SearchTickets';
import Profile from '../screens/Profile';
import UserTickets from '../screens/UserTickets';
import { bottomTabIconSize } from '../lib/constants';
import Support from '../screens/Support';
import { getOwnInfo, getOwnRole, updateAxiosInstance } from '../lib/api';
import { callConfirmationAlert } from '../lib/functions';
import Roles from '../lib/roles';
import LoadingScreen from '../components/LoadingScreen';
import Workers from '../screens/Workers';
import Buses from '../screens/Buses';
import BusTypes from '../screens/BusTypes';

interface IProps {
  navigation: any;
}

const MainTab = createMaterialBottomTabNavigator();

const MainNavigator = (props: IProps) => {
  const [userRole, setUserRole] = useState<Roles>();
  const [isLoading, setIsLoading] = useState(false);

  const { navigation } = props;

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await updateAxiosInstance();
      const response = await getOwnRole();
      if (response.error) {
        callConfirmationAlert(
          'Сталася помилка',
          () => navigation.goBack()
        );
        return;
      }
      setUserRole(response.data);
      setIsLoading(false);     
    })();
  }, []);

  return isLoading ? <LoadingScreen /> : (
    <MainTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName = '';
          if (route.name === 'SearchTickets') {
            iconName = 'magnify';
          } else if (route.name === 'Support') {
            iconName = 'headset';
          } else if (route.name === 'UserTickets') {
            iconName = focused ? 'ticket-confirmation' : 'ticket-outline';
          } else if (route.name === 'Workers') {
            iconName = 'account-supervisor';
          } else if (route.name === 'Buses') {
            iconName = 'bus-multiple';
          } else if (route.name === 'BusTypes') {
            iconName = 'playlist-edit';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account' : 'account-outline';
          }  
          return <MaterialCommunityIcons name={iconName} size={bottomTabIconSize} color={color} />;
        },
      })}
      activeColor='#5ca6f7'
      inactiveColor='black'
      barStyle={{backgroundColor: '#ffffff'}}
    >
      {userRole === Roles.Customer && (
        <MainTab.Screen
          name='UserTickets'
          component={UserTickets}
          options={{tabBarLabel: 'Мої квитки'}}
        />
      )}
      {userRole === Roles.Customer && (
        <MainTab.Screen
          name='Support'
          component={Support}
          options={{tabBarLabel: 'Підтримка'}}
        />
      )}
      {userRole === Roles.Administrator && (
        <MainTab.Screen
          name='Workers'
          component={Workers}
          options={{tabBarLabel: 'Працівники'}}
        />
      )}
      {userRole === Roles.Administrator && (
        <MainTab.Screen
          name='Buses'
          component={Buses}
          options={{tabBarLabel: 'Автобуси'}}
        />
      )}
      {userRole === Roles.Administrator && (
        <MainTab.Screen
          name='BusTypes'
          component={BusTypes}
          options={{tabBarLabel: 'Типи автобусів'}}
        />
      )}
      <MainTab.Screen
        name='Profile'
        component={Profile}
        options={{tabBarLabel: 'Профіль'}}
      />
    </MainTab.Navigator>
  );
}

export default MainNavigator;

import React, { useState } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SearchTickets from '../screens/SearchTickets';
import Profile from '../screens/Profile';
import UserTickets from '../screens/UserTickets';
import { bottomTabIconSize } from '../lib/constants';
import Support from '../screens/Support';

const MainTab = createMaterialBottomTabNavigator();

const MainNavigator = () => (
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
    <MainTab.Screen
      name='SearchTickets'
      component={SearchTickets}
      options={{tabBarLabel: 'Пошук рейсів'}}
    />
    <MainTab.Screen
      name='UserTickets'
      component={UserTickets}
      options={{tabBarLabel: 'Мої квитки'}}
    />
    <MainTab.Screen
      name='Support'
      component={Support}
      options={{tabBarLabel: 'Підтримка'}}
    />
    <MainTab.Screen
      name='Profile'
      component={Profile}
      options={{tabBarLabel: 'Профіль'}}
    />
  </MainTab.Navigator>
);

export default MainNavigator;

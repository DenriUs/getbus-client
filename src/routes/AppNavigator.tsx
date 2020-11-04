import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EntryNavigator from './EntryNavigator';
import MainNavigator from './MainNavigator';

const AppStack = createStackNavigator();
const appNavigatorScreenOptions = { headerShown: false };

const AppNavigator = () => (
  <NavigationContainer>
    <AppStack.Navigator screenOptions={appNavigatorScreenOptions}>
      <AppStack.Screen name="Entry" component={EntryNavigator} />
      <AppStack.Screen name="Main" component={MainNavigator} />
    </AppStack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;

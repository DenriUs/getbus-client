import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EntryNavigator from './EntryNavigator';
import MainNavigator from './MainNavigator';
import { View } from 'react-native';
import appStyles from '../styles/appStyle';

const AppStack = createStackNavigator();
const appNavigatorScreenOptions = { headerShown: false };

const AppNavigator = () => (
  <NavigationContainer>
    <View style={{...appStyles.flexContainer, backgroundColor: '#5ca6f7'}}>
      <AppStack.Navigator screenOptions={appNavigatorScreenOptions}>
        <AppStack.Screen name='Entry' component={EntryNavigator} />
        <AppStack.Screen name='Main' component={MainNavigator} />
      </AppStack.Navigator>
    </View>
  </NavigationContainer>
);

export default AppNavigator;

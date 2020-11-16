import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import appStyles from '../styles/appStyle';
import { View } from 'react-native';

const EntryStack = createStackNavigator();
const entryNavigatorScreenOptions = { headerShown: false };

const EntryNavigator = () => (
  <View style={{...appStyles.flexContainer, backgroundColor: '#5ca6f7'}}>
    <EntryStack.Navigator screenOptions={entryNavigatorScreenOptions}>
      <EntryStack.Screen name='Login' component={Login} />
      <EntryStack.Screen name='Register' component={Register} />
    </EntryStack.Navigator>
  </View>
);

export default EntryNavigator;

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import Register from '../screens/Register';

const EntryStack = createStackNavigator();
const entryNavigatorScreenOptions = { headerShown: false, animationEnabled: false };

const EntryNavigator = () => (
    <EntryStack.Navigator screenOptions={entryNavigatorScreenOptions}>
      <EntryStack.Screen name="Login" component={Login} />
      <EntryStack.Screen name="Register" component={Register} />
    </EntryStack.Navigator>
);

export default EntryNavigator;

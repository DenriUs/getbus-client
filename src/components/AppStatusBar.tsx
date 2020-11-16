import React from 'react'
import {  StatusBar } from 'react-native';
import { mainBackgroundColor } from '../lib/constants';

const AppStatusBar = () => (
  <StatusBar backgroundColor={mainBackgroundColor} barStyle='light-content'/>
);

export default AppStatusBar;

import React from 'react'
import { ActivityIndicator } from 'react-native-paper';
import { loadingSpinnerSize } from '../lib/constants';
import appStyles from '../styles/appStyle';
import AppStatusBar from './AppStatusBar';

const LoadingScreen = () => (
  <>
    <AppStatusBar />
    <ActivityIndicator style={appStyles.loadingSpinnerFlexContainer} size={loadingSpinnerSize} />
  </>
);

export default LoadingScreen;

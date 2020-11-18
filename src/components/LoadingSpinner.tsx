import React from 'react'
import { ActivityIndicator } from 'react-native-paper';
import { loadingSpinnerSize } from '../lib/constants';
import appStyles from '../styles/appStyle';

const LoadingSpinner = () => (
  <ActivityIndicator size={loadingSpinnerSize} color='#2b90ff' />
);

export default LoadingSpinner;

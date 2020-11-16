import React from 'react'
import { ActivityIndicator } from 'react-native-paper';
import { bottomSheetBorderRaius, bottomSheetLoadingSpinnerSize, loadingSpinnerSize } from '../lib/constants';
import appStyles from '../styles/appStyle';
import AppStatusBar from './AppStatusBar';

const BottomSheetLoadingSpinner = () => (
  <ActivityIndicator style={{marginTop: 50}} size={bottomSheetLoadingSpinnerSize} />
);

export default BottomSheetLoadingSpinner;

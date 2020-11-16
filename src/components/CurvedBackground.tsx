import React from 'react';
import { View, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg'
import appStyles from '../styles/appStyle';

const CurvedBackground = () => (
  <View style={appStyles.curvedBackgroundContainer}>
    <View style={appStyles.svgContainer} />
    <Svg height='50%' width='100%' viewBox='0 0 1440 320' style={appStyles.svgWave}>
      <Path 
        fill={appStyles.svgContainer.backgroundColor}
        d='M0,192L48,170.7C96,149,192,107,288,122.7C384,139,480,213,576,208C672,203,768,117,864,80C960,43,1056,53,1152,74.7C1248,96,1344,128,1392,144L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z'
      />
    </Svg>
  </View>
);

export default CurvedBackground;
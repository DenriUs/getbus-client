import React from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import CurvedBackground from '../components/CurvedBackground';
import AppStatusBar from '../components/AppStatusBar';
import appStyles from '../styles/appStyle';
import Trip from '../components/Trip';
import { FAB } from 'react-native-paper';
import SupportRequest from '../components/SupportRequest';

const Support = () => {
  return (  
    <View style={appStyles.flexContainer}>
      <AppStatusBar />
      <View style={appStyles.relativeFlexContainer}>
        <CurvedBackground />
        <View style={{...appStyles.relativeFlexContainer, padding: 10}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <SupportRequest />
          </ScrollView>
          <FAB
            style={{position: 'absolute', margin: 16, right: 0, bottom: 0,}} 
            icon="plus"
            onPress={() => console.log('Pressed')}
          />
        </View>
      </View>
    </View>
  );
}

export default Support;

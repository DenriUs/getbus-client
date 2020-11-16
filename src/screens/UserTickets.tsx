import React from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import CurvedBackground from '../components/CurvedBackground';
import AppStatusBar from '../components/AppStatusBar';
import appStyles from '../styles/appStyle';
import Trip from '../components/Trip';
import Ticket from '../components/Ticket';

const UserTickets = () => {
  return (  
    <View style={appStyles.flexContainer}>
      <AppStatusBar />
      <View style={appStyles.relativeFlexContainer}>
        <CurvedBackground />
        <View style={{...appStyles.relativeFlexContainer, padding: 10}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Ticket />
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

export default UserTickets;

import React, { useState } from 'react';
import { Dimensions, FlatList, ScrollView, View } from 'react-native';
import CurvedBackground from '../components/CurvedBackground';
import AppStatusBar from '../components/AppStatusBar';
import appStyles from '../styles/appStyle';
import Trip from '../components/Trip';
import Ticket from '../components/Ticket';
import { ITicket } from '../lib/entities';
import { callRepeatAlert } from '../lib/functions';
import { getUserTickets } from '../lib/api';

const UserTickets = () => {
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadTickets = async () => {
    setIsRefreshing(true);
    const ticketsList = await getUserTickets();
    if (!ticketsList) {
      callRepeatAlert(
        () => loadTickets(),
        'Сталася невідома помилка',
      )
      return;
    }
    setTickets(ticketsList);
    console.log(tickets);
    setIsRefreshing(false);
  }

  return (  
    <View style={appStyles.flexContainer}>
      <AppStatusBar />
      <View style={appStyles.relativeFlexContainer}>
        <CurvedBackground />
        <View style={{...appStyles.relativeFlexContainer, padding: 10}}>
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={tickets}
          refreshing={isRefreshing} 
          onRefresh={async () => await loadTickets()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Ticket ticketInfo={item} />
          )}
        />
        </View>
      </View>
    </View>
  );
}

export default UserTickets;

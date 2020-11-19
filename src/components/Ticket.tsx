import React from 'react'
import { View, Text } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { ITicket } from '../lib/entities';
import { bueatifyDate, formatDateTime, formatTime } from '../lib/functions';
import appStyles from '../styles/appStyle';

interface IProps {
  ticketInfo: ITicket;
}

const Ticket = (props: IProps) => {
  const { ticketInfo } = props
 
  return (
    <View>
      <TouchableNativeFeedback style={{flexDirection: 'row', padding: 10, justifyContent: 'space-between', width: '100%', backgroundColor: '#ffffff', borderRadius: 5, borderColor: '#2b90ff', borderWidth: 1}}>
        <View style={{width: '50%'}}>
          <View style={{marginTop: 5}}>
              <Text style={{fontSize: 20}}>{ticketInfo.trip?.departureCity}</Text>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{formatTime(ticketInfo.trip?.departureDateTime as Date)}</Text>
          </View>
          <Text style={{fontSize: 15, fontFamily: 'sans-serif-light'}}>{ticketInfo.trip?.tripTime}</Text>
        </View>
        <View style={{width: '50%'}}>
          <View style={{marginTop: 5}}>
            <Text style={{fontSize: 20}}>{ticketInfo.trip?.arrivalCity}</Text>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{formatTime(ticketInfo.trip?.arrivalDateTime as Date)}</Text>
          </View>
          <Text style={{fontSize: 15, fontFamily: 'sans-serif-light'}}>{bueatifyDate(ticketInfo.trip?.arrivalDateTime as Date)}</Text>
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <Text style={{marginTop: 10, fontSize: 17}}>Статус: {ticketInfo.trip?.tripState}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

export default Ticket;

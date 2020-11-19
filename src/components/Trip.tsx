import React from 'react'
import { View, Text } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { yearMonths } from '../lib/constants';
import { ITrip } from '../lib/entities';
import { bueatifyDate, formatDate, formatDateTime, formatTime } from '../lib/functions';
import appStyles from '../styles/appStyle';

interface IProps {
  tripInfo: ITrip;
  mode: 'searching' | 'checking' | 'worker';
  onPress: () => void
}

const Trip = (props: IProps) => {
  const { tripInfo, mode, onPress } = props;
  return (
    <View style={{marginBottom: 15}}>
      <TouchableNativeFeedback onPress={onPress} style={{flexDirection: 'row', padding: 10, justifyContent: 'space-between', width: '100%', backgroundColor: '#ffffff', borderRadius: 5, borderColor: '#2b90ff', borderWidth: 1}}>
        <View style={{width: '50%'}}>
          <View style={{marginTop: 5}}>
            <Text style={{fontSize: 20}}>{tripInfo.departureCity}</Text>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              {formatTime(tripInfo.departureDateTime)}
            </Text>
          </View>
          {mode === 'worker' && (
            <Text style={{fontFamily: 'sans-serif-light'}}>
              {bueatifyDate(tripInfo.departureDateTime)}
            </Text>
          )}
          <Text style={{fontSize: 15, fontFamily: 'sans-serif-light'}}>
            {tripInfo.tripTime}
          </Text>
          {mode === 'searching' && <Text style={{marginTop: 25}}>{tripInfo.availableSeatsAmount} місць</Text>}
        </View>
        <View style={{width: '50%'}}>
          <View style={{marginTop: 5}}>
            <Text style={{fontSize: 20}}>{tripInfo.arrivalCity}</Text>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              {formatTime(tripInfo.arrivalDateTime)}
            </Text>
          </View>
          <Text style={{fontSize: 15, fontFamily: 'sans-serif-light'}}>
            {bueatifyDate(tripInfo.arrivalDateTime)}
          </Text>
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            {mode === 'searching' ? (
              <View style={{backgroundColor: '#5ca6f7', position: 'relative', top: 11, width: 185, height: 40, left: 1, borderRadius: 5, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 17, color: '#ffffff'}}>{tripInfo.seatPrice} грн</Text>
              </View>
            ) : (
              <Text style={{marginTop: 10, fontSize: 17}}>Статус: {tripInfo.tripState}</Text>
            )}
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

export default Trip;

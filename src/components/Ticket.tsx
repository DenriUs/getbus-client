import React from 'react'
import { View, Text } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import appStyles from '../styles/appStyle';


const Ticket = () => {
  return (
    <TouchableNativeFeedback onPress={() => console.log('123')} style={{flexDirection: 'row', padding: 10, marginTop: 10, justifyContent: 'space-between', width: '100%', backgroundColor: '#ffffff', borderRadius: 5, borderColor: '#2b90ff', borderWidth: 1}}>
      <View style={{width: '50%'}}>
        <View style={{marginTop: 5}}>
          <Text style={{fontSize: 20}}>Полтава</Text>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>20:00</Text>
        </View>
        <Text style={{fontSize: 15, fontFamily: 'sans-serif-light'}}>8 г. 10 хв.</Text>
      </View>
      <View style={{width: '50%'}}>
        <View style={{marginTop: 5}}>
          <Text style={{fontSize: 20}}>Київ</Text>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>04:10</Text>
        </View>
        <Text style={{fontSize: 15, fontFamily: 'sans-serif-light'}}>17 листопада</Text>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <Text style={{marginTop: 10, fontSize: 17}}>Статус: Підготовка</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}

export default Ticket;

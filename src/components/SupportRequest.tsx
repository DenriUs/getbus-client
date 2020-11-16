import React from 'react'
import { View, Text } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import appStyles from '../styles/appStyle';


const SupportRequest = () => {
  return (
    <TouchableNativeFeedback onPress={() => console.log('123')} style={{flexDirection: 'row', padding: 10, marginTop: 10, justifyContent: 'space-between', alignItems: 'center', width: '100%', backgroundColor: '#ffffff', borderRadius: 5, borderColor: '#2b90ff', borderWidth: 1}}>
      <MaterialCommunityIcons name='clipboard-text-outline' size={50}/>
      <View style={{flex: 1}}>
        <View style={{marginLeft: 20}}>
          <Text style={{fontSize: 17}}>
            Заявка №1
          </Text>
          <Text style={{fontFamily: 'sans-serif-light'}}>
            15.11.2020
          </Text>
        </View>
      </View>
      <Text>
        Статус: В процесі
      </Text>
    </TouchableNativeFeedback>
  );
}

export default SupportRequest;

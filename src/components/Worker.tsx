import React from 'react'
import { View, Text } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Roles from '../lib/roles';

interface IProps {
  fullName: string;
  age: number,
  role: Roles;
  onPress: () => void;
}

const Worker = (props: IProps) => {
  const { fullName, age, role, onPress } = props;

  return (
    <View style={{marginBottom: 15}}>
      <TouchableNativeFeedback onPress={onPress} style={{flexDirection: 'row', padding: 10, height: 90, justifyContent: 'space-between', alignItems: 'center', width: '100%', backgroundColor: '#ffffff', borderRadius: 5, borderColor: '#2b90ff', borderWidth: 1}}>
        <MaterialCommunityIcons 
          name={
            role === Roles.Dispatcher ? 'monitor-dashboard' :
            role === Roles.BusDriver ? 'bus' : 'help'
          }
          size={50}
          color='#5ca6f7' />
        <View style={{flex: 1}}>
          <View style={{marginLeft: 20, alignItems: 'flex-start'}}>
            <Text style={{fontSize: 17}}>
              {fullName}
            </Text>
            <Text style={{fontSize: 15}}>
              Вік: <Text style={{fontFamily: 'sans-serif-light'}}>{age} років</Text>
            </Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

export default Worker;

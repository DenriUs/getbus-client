import React from 'react';
import { FlatList, View, Text } from 'react-native';
import CurvedBackground from '../components/CurvedBackground';
import AppStatusBar from '../components/AppStatusBar';
import appStyles from '../styles/appStyle';
import { ukraineCities } from '../lib/constants';
import { Divider, TouchableRipple } from 'react-native-paper';

interface IProps {
  handleCityPress: (city: string) => void;
}

const CitiesSelect = (props: IProps) => {
  const { handleCityPress } = props;

  return (  
    <View style={appStyles.flexContainer}>
      <AppStatusBar />
      <View style={appStyles.relativeFlexContainer}>
        <CurvedBackground />
        <View style={{...appStyles.relativeFlexContainer, padding: 10, backgroundColor: '#ffffff'}}>
          <FlatList
            keyExtractor={(item) => item}
            data={ukraineCities}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <>
                <TouchableRipple 
                  onPress={() => handleCityPress(item)}
                  rippleColor='rgba(0, 0, 0, 0.3)'
                >
                  <View>
                    <View style={{marginVertical: 20}}>
                      <Text style={{fontSize: 20}}>
                        {item}
                      </Text>
                    </View>
                    <Divider />
                  </View>
                </TouchableRipple>
              </>
            )}
          />
        </View>
      </View>
    </View>
  );
}

export default CitiesSelect;

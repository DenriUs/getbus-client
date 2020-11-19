import React from 'react'
import { View, Text } from 'react-native';

const FlatListEmpty = () => {

  return (
    <View style={{flex: 1,}}>
      <Text style={{fontSize: 17}}>
        {`Не знайдено жодного запису. Спробуйте оновити вкладку`}
      </Text>
    </View>
  );
}

export default FlatListEmpty;

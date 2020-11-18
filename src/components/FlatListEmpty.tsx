import React from 'react'
import { View, Text } from 'react-native';

interface IProps {
  entityEmptyName?: string
}

const FlatListEmpty = (props: IProps) => {
  const { entityEmptyName } = props;

  return (
    <View style={{flex: 1}}>
      {entityEmptyName && (
          <Text style={{fontSize: 17}}>
            {`Не знайдено жодного ${entityEmptyName}. Спробуйте оновити вкладку`}
          </Text>
        )
      }
    </View>
  );
}

export default FlatListEmpty;

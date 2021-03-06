import React from 'react'
import { View, Text } from 'react-native';
import appStyles from '../styles/appStyle';

interface IProps {
  errorText: string;
}

const FormErrorBox = (props: IProps) => {
  const { errorText } = props;

  return (
    <View style={{...appStyles.centeredContainer, ...appStyles.fullWidth}}>
      <View style={appStyles.errorsContainer}>
        <Text style={appStyles.errorText}>
          {errorText}
        </Text>
      </View>
    </View>
  );
}

export default FormErrorBox;

import React from 'react'
import { View, Text } from 'react-native';
import appStyles from '../styles/appStyle';

interface IProps {
  fieldError: string;
}

const FormErrorBox = (props: IProps) => {
  const { fieldError } = props;

  return (
    <View style={{...appStyles.centeredContainer, ...appStyles.fullWidth}}>
      <View style={appStyles.errorsContainer}>
        <Text style={appStyles.errorText}>
          {fieldError}
        </Text>
      </View>
    </View>
  );
}

export default FormErrorBox;

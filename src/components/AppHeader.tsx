import React from 'react'
import { Appbar } from 'react-native-paper';
import appStyles from '../styles/appStyle';

interface IProps {
  handleBackActionPress: () => void;
}

const AppHeader = (props: IProps) => {
  const { handleBackActionPress } = props;

  return ( 
    <Appbar.Header dark={true} statusBarHeight={0} style={appStyles.screenHeader}>
      <Appbar.BackAction onPress={handleBackActionPress} />
      <Appbar.Content title="Реєстрація" />
    </Appbar.Header>
  );
}

export default AppHeader;

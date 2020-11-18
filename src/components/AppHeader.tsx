import React from 'react'
import { Appbar } from 'react-native-paper';
import appStyles from '../styles/appStyle';

interface IProps {
  title: string
  handleBackActionPress: () => void;
}

const AppHeader = (props: IProps) => {
  const { title, handleBackActionPress } = props;

  return ( 
    <Appbar.Header dark={true} statusBarHeight={0} style={appStyles.screenHeader}>
      <Appbar.BackAction onPress={handleBackActionPress} />
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
}

export default AppHeader;

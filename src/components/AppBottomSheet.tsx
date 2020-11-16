import React, { ComponentType, MutableRefObject } from 'react';
import { View } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import appStyles from '../styles/appStyle';
import { bottomSheetSnapConfig } from '../lib/constants';

interface IProps {
  content: JSX.Element,
  bottomSheetRef: MutableRefObject<any>,
}

const AppBottomSheet = (props: IProps) => {
  const { content, bottomSheetRef } = props;

  const renderContent = () => (
    <View style={appStyles.bottomSheetContent}>
      {content}
    </View>
  );

  const renderHeader = () => (
    <View style={appStyles.bottomSheetHeader}>
      <View style={appStyles.panelHeader}>
        <View style={appStyles.panelHandle}>
        </View>
      </View>
    </View>
  )

  return (  
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={bottomSheetSnapConfig}
      renderHeader={renderHeader}
      renderContent={renderContent}
      initialSnap={2}
    />
  );
}

export default AppBottomSheet;

import React from 'react';
import AppNavigator from './src/routes/AppNavigator';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    primary: '#ffffff',
    accent: '#2b90ff',
    underlineColor: '#ffffff',
    placeholder: '#ffffff',
    text: '#ffffff',
    background: 'transparent'
  },
};

const App = () => (
  <PaperProvider theme={theme}>
    <AppNavigator />
  </PaperProvider>
);

export default App;

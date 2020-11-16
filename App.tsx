import React from 'react';
import AppNavigator from './src/routes/AppNavigator';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from './src/lib/constants';

const App = () => (
  <PaperProvider theme={theme}>
    <AppNavigator />
  </PaperProvider>
);

export default App;

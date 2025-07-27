import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import AppNavigator from './navigation/AppNavigator';
import { useAuthRestore } from './hooks/auth/useAuthRestore';
import { StatusBar } from 'react-native';
import COLORS from './constants/colors';

const AppWrapper = () => {
  const isAuthReady = useAuthRestore();
  if (!isAuthReady) return null;
  return <AppNavigator />;
};

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor={COLORS.background} barStyle="light-content" />
      <AppWrapper />
    </Provider>
  );
};

export default App;

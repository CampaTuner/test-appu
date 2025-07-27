import { NavigationContainer } from '@react-navigation/native';
import MainStack from './MainStack';
import AuthStack from './AuthStack';
import Toast from 'react-native-toast-message';
import toastConfig from '../config.js/toastConfig';
import { useSelector } from 'react-redux';
import { useErrorToast } from '../hooks/common/useErrorToast';
import Loading from '../components/Loading';
import RNBootSplash from 'react-native-bootsplash';

const AppNavigator = () => {
  useErrorToast();
  const { token, citizen } = useSelector(state => state.auth);
  const { loading } = useSelector(state => state.ui);

  return (
    <>
      <NavigationContainer
        onReady={async () => {
          await RNBootSplash.hide({ fade: true });
        }}
      >
        {token && citizen ? <MainStack /> : <AuthStack />}
        {loading && <Loading visible={loading} />}
      </NavigationContainer>
      <Toast config={toastConfig} />
    </>
  );
};

export default AppNavigator;

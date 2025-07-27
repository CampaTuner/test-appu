import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import { clearMessage } from '../../redux/slices/uiSlice';

export const useErrorToast = () => {
  const { message } = useSelector(state => state.ui);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!message || !message.type || !message.text) return;

    Toast.hide();

    Toast.show({
      type: message.type,
      text1: message.type === 'error' ? 'Error' : 'Success',
      text2: message.text,
      visibilityTime: 2000,
      autoHide: true,
      position: 'top',
      topOffset: 25,
    });

    dispatch(clearMessage());
  }, [message]);
};

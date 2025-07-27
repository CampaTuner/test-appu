import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setCitizen } from '../../redux/slices/authSlice';
import { setMessage, setLoading } from '../../redux/slices/uiSlice';
import { fetchCurrentCitizenService } from '../../services/authService';

export const useAuthRestore = () => {
  const dispatch = useDispatch();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const restore = async () => {
      try {
        dispatch(setLoading(true));
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const data = await fetchCurrentCitizenService();
          dispatch(setCitizen({ citizen: data.citizen, token }));
        }
      } catch (err) {
        await AsyncStorage.removeItem('token');
        dispatch(setMessage({ text: 'Error restoring session', type: 'error' }));
      } finally {
        dispatch(setLoading(false));
        setIsReady(true);
      }
    };

    restore();
  }, []);

  return isReady;
};

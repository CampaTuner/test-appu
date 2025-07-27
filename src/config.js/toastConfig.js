import React from 'react';
import { BaseToast, ErrorToast } from 'react-native-toast-message';

const toastConfig = {
    success: (props) => (
        <BaseToast
            {...props}
            style={{ backgroundColor: '#1a1a1a', borderLeftColor: '#4BB543' }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#fff'
            }}
            text2Style={{
                fontSize: 14,
                color: '#ccc'
            }}
            
        />
    ),
    error: (props) => (
        <ErrorToast
            {...props}
            style={{ backgroundColor: '#1a1a1a', borderLeftColor: '#FF3B30' }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#fff'
            }}
            text2Style={{
                fontSize: 14,
                color: '#ccc'
            }}
        />
    ),
};

export default toastConfig

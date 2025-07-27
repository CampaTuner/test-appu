import { useDispatch } from 'react-redux';

import {
    setMessage,
} from "../../redux/slices/uiSlice"
import { setLoading, deleteAllNotifications, setNotifications } from '../../redux/slices/notificationSlice';
import { deleteAllNotificationsService, getAllNotificationService } from '../../services/notificationService';



export const useNotification = () => {
    const dispatch = useDispatch();

    const getNotifications = async () => {
        try {
            dispatch(setLoading(true));
            let res = await getAllNotificationService();
            dispatch(setNotifications(res.notifications));
        } catch (error) {
            const msg = error?.response?.data?.message || 'Error fetching notifications';
            dispatch(setMessage({ text: msg, type: 'error' }));
            return false;
        } finally {
            dispatch(setLoading(false));
        }
    }

    const deleteNotifications = async () => {
        try {
            dispatch(setLoading(true));
            await deleteAllNotificationsService();
            dispatch(deleteAllNotifications());
        } catch (error) {
            const msg = error?.response?.data?.message || 'Error deleting notifications';
            dispatch(setMessage({ text: msg, type: 'error' }));
            return false;
        } finally {
            dispatch(setLoading(false));
        }
    };


    return {
        getNotifications,
        deleteNotifications
    };

}
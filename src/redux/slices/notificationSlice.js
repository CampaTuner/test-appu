import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notifications: [],
    loading: false,
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotifications: (state, action) => {
            state.notifications = action.payload;
        },
        deleteAllNotifications: (state) => {
            state.notifications = [];
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },

    }
})

export const {
    setNotifications,
    deleteAllNotifications,
    setLoading,
} = notificationSlice.actions;

export default notificationSlice.reducer; 

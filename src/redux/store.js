import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice'
import uiReducer from './slices/uiSlice'
import garbageReducer from './slices/garbageSlice'
import notificationReducer from './slices/notificationSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        ui: uiReducer,
        garbage: garbageReducer,
        notification: notificationReducer
    }
})
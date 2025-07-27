import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    citizen: null,
    token: null,
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCitizen(state, action) {
            if (action.payload.citizen) {
                state.citizen = action.payload.citizen;
            }
            if (action.payload.token !== undefined) {
                state.token = action.payload.token;
            }

        },
        logoutCitizen(state) {
            state.citizen = null;
            state.token = null;
            AsyncStorage.removeItem('token');
        }
    }
})

export const {
    setCitizen,
    logoutCitizen,
} = authSlice.actions;

export default authSlice.reducer;
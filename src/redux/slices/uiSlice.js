import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    message: null,
}


const authSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setMessage(state, action) {
            state.message = action.payload;
            state.loading = false;
        },
        clearMessage(state) {
            state.message = null;
        },
    }
})

export const {
    setLoading,
    setMessage,
    clearMessage,
} = authSlice.actions;

export default authSlice.reducer;
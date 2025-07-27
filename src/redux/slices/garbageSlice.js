import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allGarbages: [],
    successGarbages: [],
    loading: false,
}

const garbageSlice = createSlice({
    name: 'garbage',
    initialState,
    reducers: {
        setAllGarbages: (state, action) => {
            state.allGarbages = action.payload;
        },
        setSuccessGarbages: (state, action) => {
            state.successGarbages = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },

    }
})

export const {
    setAllGarbages,
    setSuccessGarbages,
    setLoading,
} = garbageSlice.actions;

export default garbageSlice.reducer; 

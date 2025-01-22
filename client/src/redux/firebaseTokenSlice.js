import { createSlice } from "@reduxjs/toolkit";

const firebaseTokenSlice = createSlice({
    name:"firebaseToken",
    initialState:{
        token : null
    },
    reducers:{
        setToken:(state, action) => {
            state.token = action.payload;
        },
    }
});
export const {setToken } = firebaseTokenSlice.actions;
export default firebaseTokenSlice.reducer;
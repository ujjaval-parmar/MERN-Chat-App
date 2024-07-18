import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: null,
    onlineUsers: [],
    socketConnection: null
};



const userSlice = createSlice({
    name: 'user',
    initialState,

    reducers:{

        setUserDetails: (state, action)=>{
            state.user = action.payload;
        },

        logoutUser: (state)=>{
            state.user = null,
            state.socketConnection= null;

        },

        setUserOnline: (state, action)=>{
            state.onlineUsers = action.payload;
        },

        setUserOffline: (state, action)=>{
            state.onlineUsers = action.payload;
        },

        setSocketConnection: (state, action)=>{
            state.socketConnection= action.payload;
        }
    }
});


export const { setUserDetails, logoutUser, setUserOffline, setUserOnline, setSocketConnection } = userSlice.actions;


export default userSlice.reducer;
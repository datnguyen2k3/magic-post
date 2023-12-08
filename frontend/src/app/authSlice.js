import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loggedIn: false,
        username: '',
        name: ''
    },
    reducers: {
        login: (state, action) => {
            const username = action.username;
            const name = action.name;
            state.loggedIn = true;
            state.username = username;
            state.name = name;
        },
        logout: (state) => {
            state.loggedIn = false;
            state.username = '';
            state.name = 'name';
        },
    },
});

export const { login, logout } = authSlice.actions;

export const selectLoggedIn = (state) => state.auth.loggedIn;

export default authSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        account: {},
        role: ''
    },
    reducers: {
        login: (state, action) => {
            const { account } = action.payload;
            console.log(action.payload, 'check', account)
            state.account = account;
            state.role = account.role;
        },
        logout: (state) => {
            state.account = {};
            state.role = ''
        },
    },
});

export const { login, logout } = authSlice.actions;

export const selectRole = (state) => state.auth.role;

export const selectAccount = (state) => state.auth.account;

export default authSlice.reducer;

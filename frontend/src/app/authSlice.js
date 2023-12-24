import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        account: {},
        role: '',
        token: '',
    },
    reducers: {
        updateToken: (state, action) => {
            const { token } = action.payload;
            state.token = token
        },
        login: (state, action) => {
            const { account } = action.payload;
            state.account = account;
            state.role = account.role;
        },
        logout: (state) => {
            state.account = {};
            state.role = '';
            state.token = ''
        },
    },
});

export const { login, logout, updateToken } = authSlice.actions;

export const selectRole = (state) => state.auth.role;

export const selectToken = (state) => state.auth.token;

export const selectAccount = (state) => state.auth.account;

export default authSlice.reducer;

// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from '../../app/axios';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null,
    isLogon: !!localStorage.getItem('token'),  // Login status based on token presence
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLogon = true;
      localStorage.setItem('token', action.payload.token);
    },
    signUpSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLogon = true;
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLogon = false;
      localStorage.removeItem('token');
    },
  },
});

export const { loginSuccess, signUpSuccess, logout } = authSlice.actions;

export const login = (credentials) => async (dispatch) => {
  const response = await axios.post('http://localhost:3000/api/auth/signin', credentials);  // Full path
  dispatch(loginSuccess(response.data));
};

export const signUp = (credentials) => async (dispatch) => {
  const response = await axios.post('http://localhost:3000/api/auth/signup', credentials);  // Full path
  dispatch(signUpSuccess(response.data));
};

export default authSlice.reducer;

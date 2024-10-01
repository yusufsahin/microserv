// src/features/profile/profileSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../app/axios';

// Thunk to fetch profile data
export const getProfile = createAsyncThunk('profile/getProfile', async () => {
  const response = await axios.get('http://localhost:3001/api/profile');  // Fetch profile from backend
  return response.data;
});

// Thunk to update profile data
export const updateProfile = createAsyncThunk('profile/updateProfile', async (profileData) => {
  const response = await axios.put('http://localhost:3001/api/profile', profileData);  // Update profile on backend
  return response.data;
});

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    user: null,
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export default profileSlice.reducer;

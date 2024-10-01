// src/features/modals/modalSlice.js
import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    showModal: false,
    modalContent: '',  // Changed from React element to a string
  },
  reducers: {
    openModal: (state, action) => {
      state.showModal = true;
      state.modalContent = action.payload;  // Expecting a string or object
    },
    closeModal: (state) => {
      state.showModal = false;
      state.modalContent = '';
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;

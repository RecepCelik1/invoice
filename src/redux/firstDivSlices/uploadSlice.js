import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  uploadLogoPath: null,
};

export const uploadSlice = createSlice({
  name: 'logo',
  initialState,
  reducers: {
    setUploadLogoPath: (state, action) => {
      state.uploadLogoPath = action.payload;
    },
  },
});

export const { setUploadLogoPath } = uploadSlice.actions;

export default uploadSlice.reducer;
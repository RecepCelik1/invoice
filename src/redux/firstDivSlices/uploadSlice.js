import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  uploadLogo : null
}

export const uploadSlice = createSlice({
  name: 'logo',
  initialState,
  reducers: {
    logoSlice: (state, action) => {
      state.uploadLogo = action.payload
    },

  },
})

export const { logoSlice } = uploadSlice.actions

export default uploadSlice.reducer
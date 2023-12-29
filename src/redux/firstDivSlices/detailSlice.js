import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  companyDetails : '',
  billDetails : ''
}

export const detailSlice = createSlice({
  name: 'detailSlice',
  initialState,
  reducers: {
    
    company: (state, action) => {
      state.companyDetails = action.payload
    },
    bill: (state, action) => {
      state.billDetails = action.payload
    },
  },
})

export const { company, bill } = detailSlice.actions

export default detailSlice.reducer
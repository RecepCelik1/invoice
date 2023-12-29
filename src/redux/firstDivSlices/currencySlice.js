import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currency : null,
}

export const currencySlice = createSlice({
  name: 'currencySlice',
  initialState,
  reducers: {
    
    Currency: (state, action) => {
      state.currency = action.payload
    }
  },
})

export const { Currency } = currencySlice.actions

export default currencySlice.reducer
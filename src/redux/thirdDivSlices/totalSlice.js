import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  tax: 0,
  discount: 0,
  shipping: 0,
}

export const totalSlice = createSlice({
  name: 'totalSlice',
  initialState,
  reducers: {
    
    taxFunc: (state, action) => {
      state.tax = action.payload
    },
    discountFunc: (state, action) => {
      state.discount = action.payload
    },
    shippingFunc: (state, action) => {
      state.shipping = action.payload
    },
  },
})

export const { taxFunc, discountFunc, shippingFunc } = totalSlice.actions

export default totalSlice.reducer
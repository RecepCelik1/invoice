import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  invoiceNumber: '',
  purchaseOrder: ''
}

export const nameSlice = createSlice({
  name: 'nameSlice',
  initialState,
  reducers: {
    
    invoiceNum: (state, action) => {
      state.invoiceNumber = action.payload
    },
    purchaseNum: (state, action) => {
      state.purchaseOrder = action.payload
    },
  },
})

export const { invoiceNum, purchaseNum } = nameSlice.actions

export default nameSlice.reducer
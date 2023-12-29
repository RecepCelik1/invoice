import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  invoiceDate: { day: null, month: null, year: null },
  dueDate : { day: null, month: null, year: null },
}

export const calenderSlice = createSlice({
  name: 'calenderSlice',
  initialState,
  reducers: {
    
    invoicerFunc: (state, action) => {
      state.invoiceDate = action.payload
    },
    dueDaterFunc: (state, action) => {
      state.dueDate = action.payload
    },
  },
})

export const { invoicerFunc, dueDaterFunc } = calenderSlice.actions

export default calenderSlice.reducer
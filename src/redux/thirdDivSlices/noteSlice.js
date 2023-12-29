import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  notes: '',
  bankAccount: ''
}

export const noteSlice = createSlice({
  name: 'noteSlice',
  initialState,
  reducers: {
    
    note: (state, action) => {
      state.notes = action.payload
    },
    bank: (state, action) => {
      state.bankAccount = action.payload
    },
  },
})

export const { note, bank } = noteSlice.actions

export default noteSlice.reducer
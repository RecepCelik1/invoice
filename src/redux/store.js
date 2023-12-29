
import { configureStore } from '@reduxjs/toolkit'
import nameSlice from './firstDivSlices/nameSlice'
import uploadSlice from './firstDivSlices/uploadSlice'
import detailSlice from './firstDivSlices/detailSlice'
import currencySlice from './firstDivSlices/currencySlice'
import calenderSlice from './firstDivSlices/calenderSlice'
import dataSlice from './secondDivSlices/dataSlice'
import noteSlice from './thirdDivSlices/noteSlice'
import totalSlice from './thirdDivSlices/totalSlice'


export const store = configureStore({
  reducer: {
    name : nameSlice,
    logo : uploadSlice,
    details : detailSlice,
    currency : currencySlice,
    calenders : calenderSlice,
    dataStore : dataSlice,
    notes : noteSlice,
    total : totalSlice,
  },
})

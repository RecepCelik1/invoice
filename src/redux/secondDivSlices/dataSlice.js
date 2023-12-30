import { createSlice } from '@reduxjs/toolkit'




const initialState = {
  data : [] ,
  sumOfamounts : 0,
  dynamicHeight : 0, 
}

export const dataSlice = createSlice({
  name: 'dataSlice',
  initialState,
  reducers: {
    dynamicHeightFunc: (state, action) => {
      state.dynamicHeight = action.payload
    },
    defaultDataFunc: (state, action) => {
      const newExpense = action.payload;
      state.data.push(newExpense);
      state.sumOfamounts += newExpense.amount;
    },
    createDataFunc: (state, action) => {
      state.data = [...state.data, action.payload]
    },
    
    deleteDataFunc: (state, action) => {
      const indexToDelete = action.payload;
      const deletedExpense = state.data[indexToDelete];
      if (deletedExpense) {
        state.sumOfamounts -= deletedExpense.amount || 0;
        state.data = state.data.filter((_, index) => index !== indexToDelete);
      } else {
        console.error('Invalid index to delete:', indexToDelete);
      }
    },
    
    updateDataFunc: (state, action) => {
      const { index, expense } = action.payload;
      state.data = state.data.map((item, i) => (i === index ? { ...item, ...expense } : item));
      state.sumOfamounts = state.data.reduce((total, item) => total + (item.amount || 0), 0);
    },
    switchItems: (state, action) => {
      const { index } = action.payload;

      if (index > 0 && index < state.data.length) { //0. indeksteki yani en yukarıdaki itemi kendisinden üstteki eleman ile değiştireme-
        const currentExpense = state.data[index];   //yiz. eğer okuyorsan mutlu yıllar sana okuyucu tarih : 30 Aralık 2021 gecenin 
                                                    // 2.50'si muhtemelen benim gibi hayatsız bir yazılımcıysan mutlu yıllar diyenin
          const temp = state.data[index - 1];       // olmayacaktır :) 
          state.data[index - 1] = { ...currentExpense };
          state.data[index] = { ...temp };
      } else {
        console.log('Index out of bounds.');
      }
    },
  },
})


export const { createDataFunc,deleteDataFunc,updateDataFunc,switchItems,defaultDataFunc,dynamicHeightFunc } = dataSlice.actions

export default dataSlice.reducer
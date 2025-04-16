import { createSlice } from '@reduxjs/toolkit'

const bookTrainSlice = createSlice({
    name: 'bookTrain',
    initialState: null, // ✅ FIXED
    reducers: {
      addBookTrain: (state, action) => {
        return action.payload;
      }
    }
  });
  
export const {addBookTrain}=bookTrainSlice.actions
export default bookTrainSlice.reducer
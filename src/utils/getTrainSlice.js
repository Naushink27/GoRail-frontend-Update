import { createSlice } from '@reduxjs/toolkit'

const getTrainSlice = createSlice({
    name: 'train',
    initialState: [], // ✅ FIXED
    reducers: {
      addTrain: (state, action) => {
        return action.payload;
      }
    }
  });
  
export const {addTrain}=getTrainSlice.actions
export default getTrainSlice.reducer
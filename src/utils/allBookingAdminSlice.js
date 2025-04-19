
import { createSlice } from "@reduxjs/toolkit";
const allbookingsSlice= createSlice({
    name:'allbooking',
    initialState:null,
    reducers:{
        addAllBookings:(state,action)=>{
            return action.payload;
        },
        removeAllBookings:(state,action)=>{
            return null ;
        }
    }
})

export const {addAllBookings,removeAllBookings}=allbookingsSlice.actions
export default allbookingsSlice.reducer;
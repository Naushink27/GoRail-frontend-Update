import reducer from "./getTrainSlice";
import { createSlice } from "@reduxjs/toolkit";
const allUsersSlice= createSlice({
    name:'allUser',
    initialState:null,
    reducers:{
        addAllUser:(state,action)=>{
            return action.payload;
        },
        removeAllUser:(state,action)=>{
            return null ;
        }
    }
})

export const {addAllUser,removeAllUser}=allUsersSlice.actions
export default allUsersSlice.reducer;
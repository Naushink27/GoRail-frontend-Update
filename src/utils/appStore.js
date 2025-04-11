import { configureStore } from '@reduxjs/toolkit';
import getTrainSlice from './getTrainSlice';
const appStore=configureStore({
    reducer:{
        
        train:getTrainSlice,
    }

})

export default appStore;
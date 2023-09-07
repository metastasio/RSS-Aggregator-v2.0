import { configureStore } from '@reduxjs/toolkit';
import inputReducer from './inputSlice.js';

export default configureStore({
  reducer: {
    input: inputReducer,
  },
});

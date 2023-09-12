import { configureStore } from '@reduxjs/toolkit';
import inputReducer from './appSlice.js';

export default configureStore({
  reducer: {
    input: inputReducer,
  },
});

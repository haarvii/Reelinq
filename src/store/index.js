import { configureStore } from '@reduxjs/toolkit';
import brandReducer from './slices/brandSlice'; // add other slices as needed

export const store = configureStore({
  reducer: {
    brand: brandReducer,
  },
});
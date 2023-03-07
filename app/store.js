import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../redux/slices/authSlice';
import categorySlice from '../redux/slices/categorySlice';
import wordSlice from '../redux/slices/wordSlice';

export const store = configureStore({
  reducer: {
    userAuth: authSlice,
    category: categorySlice,
    word: wordSlice,
  },
});

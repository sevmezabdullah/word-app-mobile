import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const CATEGORY_URL = 'http://192.168.1.115:3000/category/categories';
const initialState = {
  categories: [],
  status: 'idle',
};
export const getCategories = createAsyncThunk('category/getAll', async () => {
  const token = await AsyncStorage.getItem('token');
  const response = await axios.get(CATEGORY_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
});
const categorySlice = createSlice({
  name: 'category',
  initialState,
  extraReducers(builder) {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export default categorySlice.reducer;

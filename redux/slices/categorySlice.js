import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { emulatorUrls, localUrls } from '../../constants/uri';
const CATEGORY_URL = localUrls.GET_CATEGORIES;
const GET_CATEGORY_ID = localUrls.GET_BY_ID;

const initialState = {
  categories: [],
  categoriesContainer: [],
  status: 'idle',
  category: null,
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

export const getCategoryById = createAsyncThunk(
  'category/byId',
  async (categoryId) => {
    const response = await axios.get(GET_CATEGORY_ID + '/' + categoryId);
    return response.data;
  }
);
const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    handleSearch: (state, action) => {
      const category = action.payload.text;
      const nativeLangCode = action.payload.nativeLang;
      if (category.length > 0) {
        const filteredList = state.categories.filter((categoryItem) =>
          categoryItem.titles[nativeLangCode]
            .toLowerCase()
            .includes(category.toLowerCase())
        );
        state.categories = filteredList;
      }
    },
    clearSearch: (state, action) => {
      state.categories = state.categoriesContainer;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.categoriesContainer = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        console.log('Kategori Hatası');
      })
      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.category = action.payload;
      });
  },
});
export const { handleSearch, clearSearch } = categorySlice.actions;
export default categorySlice.reducer;

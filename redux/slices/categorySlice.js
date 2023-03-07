import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { emulatorUrls, localUrls } from '../../constants/uri';
const CATEGORY_URL = emulatorUrls.GET_CATEGORIES;
const GET_CATEGORY_ID = emulatorUrls.GET_BY_ID;
const GET_WORDS_BY_CATEGORY_ID = emulatorUrls.GET_WORDS_BY_CATEGORY_ID;

const initialState = {
  categories: [],
  categoriesContainer: [],
  status: 'idle',
  category: null,
  words: [],
  wordLoading: 'idle',
};
export const getCategories = createAsyncThunk('category/getAll', async () => {
  const token = await AsyncStorage.getItem('token');
  const response = await axios.get(CATEGORY_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
});

export const getWordsByCategoryId = createAsyncThunk(
  'category/getByIdWord',
  async (id) => {
    const response = await axios.get(GET_WORDS_BY_CATEGORY_ID + id, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  }
);

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
        state.status = 'fullfilled';
      })
      .addCase(getCategories.rejected, (state, action) => {
        console.log('Kategori Hatası');
      })
      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.category = action.payload;
      })
      .addCase(getWordsByCategoryId.fulfilled, (state, action) => {
        state.words = action.payload;
        state.wordLoading = 'fullfilled';
      })
      .addCase(getWordsByCategoryId.pending, (state, action) => {
        state.wordLoading = 'loading';
      });
  },
});
export const { handleSearch, clearSearch } = categorySlice.actions;
export default categorySlice.reducer;

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { localUrls, emulatorUrls } from '../../constants/uri';
const CATEGORY_URL = localUrls.GET_CATEGORIES;
const GET_CATEGORY_ID = localUrls.GET_BY_ID;
const GET_WORDS_BY_CATEGORY_ID = localUrls.GET_WORDS_BY_CATEGORY_ID;
const GET_CATEGORIES_BY_LANGCODE = localUrls.GET_CATEGORIES_BY_LANGCODE;

const initialState = {
  categories: [],
  categoriesContainer: [],
  status: 'idle',
  category: null,
  words: [],
  wordLoading: 'idle',
};
export const getCategories = createAsyncThunk('category/getAll', async () => {
  const token = await SecureStore.getItemAsync('token');
  const response = await axios.get(CATEGORY_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
});

export const getCategoriesByLangCodes = createAsyncThunk(
  'category/getByLangCodes',
  async ({ nativeLang, currentLang }) => {
    const user = JSON.parse(await SecureStore.getItemAsync('user'));
    console.log('🚀 ~ file: categorySlice.js:35 ~ user:', user);
    const response = await axios.get(
      GET_CATEGORIES_BY_LANGCODE +
        '/' +
        user.nativeLang +
        '/' +
        user.currentLang
    );
    return response.data;
  }
);
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
        const filteredList = state.categories.filter((categoryItem) => {});

        // state.categories = filteredList;
      }
    },
    clearSearch: (state, action) => {
      state.categories = state.categoriesContainer;
    },
    clearWords: (state, action) => {
      state.words = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.category = action.payload;
      })
      .addCase(getWordsByCategoryId.fulfilled, (state, action) => {
        state.words = action.payload;
        state.wordLoading = 'fullfilled';
      })
      .addCase(getWordsByCategoryId.pending, (state, action) => {
        state.wordLoading = 'loading';
      })
      .addCase(getCategoriesByLangCodes.fulfilled, (state, action) => {
        state.categories = action.payload.categories;
        state.categoriesContainer = action.payload.categories;
        state.status = 'fullfilled';
      });
  },
});
export const { handleSearch, clearSearch, clearWords } = categorySlice.actions;
export default categorySlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { localUrls, emulatorUrls } from '../../constants/uri';

const GET_QUIZ_BY_ID = localUrls.GET_QUIZ_BY_ID;
const GET_QUIZ_BY_DIffICULTY = localUrls.GET_QUIZ_BY_DIffICULTY;
const initialState = {
  quiz: null,
  status: 'idle',
};

export const getQuizById = createAsyncThunk('quiz/byId', async (quizId) => {
  const response = await axios.get(GET_QUIZ_BY_ID + quizId);
  return response.data;
});
export const getQuizByDifficulty = createAsyncThunk(
  'quiz/byDifficulty',
  async ({ difficulty, currentLang }) => {
    console.log(difficulty, currentLang);
    const response = await axios.get(
      GET_QUIZ_BY_DIffICULTY + difficulty + '/' + currentLang
    );
    return response.data;
  }
);

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    initialize: (state, action) => {
      state.quiz = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuizById.pending, (state, action) => {
        state.status = 'idle';
      })
      .addCase(getQuizById.fulfilled, (state, action) => {
        state.quiz = action.payload;
        state.status = 'fulfilled';
      })
      .addCase(getQuizById, (state, action) => {
        state.status = 'error';
      })
      .addCase(getQuizByDifficulty.pending, (state, action) => {
        state.status = 'idle';
      })
      .addCase(getQuizByDifficulty.fulfilled, (state, action) => {
        state.quiz = action.payload;
        state.status = 'fulfilled';
      });
  },
});
export const { initialize } = quizSlice.actions;
export default quizSlice.reducer;

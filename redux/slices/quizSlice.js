import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { localUrls, emulatorUrls } from '../../constants/uri';

const GET_QUIZ_BY_ID = localUrls.GET_QUIZ_BY_ID;
const initialState = {
  quiz: null,
  status: 'idle',
};

export const getQuizById = createAsyncThunk('quiz/byId', async (quizId) => {
  const response = await axios.get(GET_QUIZ_BY_ID + quizId);
  return response.data;
});

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getQuizById.pending, (state, action) => {
      state.status = 'idle';
    });
    builder
      .addCase(getQuizById.fulfilled, (state, action) => {
        state.quiz = action.payload;
        state.status = 'fulfilled';
      })
      .addCase(getQuizById, (state, action) => {
        state.status = 'error';
      });
  },
});

export default quizSlice.reducer;

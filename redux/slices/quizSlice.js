import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { localUrls, emulatorUrls } from '../../constants/uri';

const GET_QUIZ_BY_ID = localUrls.GET_QUIZ_BY_ID;
const GET_QUIZ_BY_DIffICULTY = localUrls.GET_QUIZ_BY_DIffICULTY;
const initialState = {
  quiz: null,
  status: 'idle',
  correctCount: 0,
  wrongCount: 0,

  currentCorrectAnswers: [],
  userAnswers: [],
  questions: [],
  knownWords: [],
};

export const getQuizById = createAsyncThunk('quiz/byId', async (quizId) => {
  const response = await axios.get(GET_QUIZ_BY_ID + quizId);
  return response.data;
});
export const getQuizByDifficulty = createAsyncThunk(
  'quiz/byDifficulty',
  async ({ difficulty, currentLang }) => {
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
      state.correctCount = 0;
      state.wrongCount = 0;
      state.currentCorrectAnswers = [];
      state.userAnswers = [];
      state.questions = [];
      state.knownWords = [];
    },
    increaseCorrect: (state, action) => {
      state.correctCount++;
    },
    increaseWrong: (state, action) => {
      state.wrongCount++;
    },

    addCorrectAnswer: (state, action) => {
      state.currentCorrectAnswers.push(action.payload);
    },
    addUserAnswer: (state, action) => {
      state.userAnswers.push(action.payload);
    },
    addQuestion: (state, action) => {
      state.questions.push(action.payload);
    },
    addKnownWords: (state, action) => {
      state.knownWords.push(action.payload);
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
export const {
  initialize,
  increaseCorrect,
  increaseWrong,
  addCorrectAnswer,
  addUserAnswer,
  addQuestion,
  addKnownWords,
} = quizSlice.actions;
export default quizSlice.reducer;

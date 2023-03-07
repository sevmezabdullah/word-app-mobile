import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  quiz: null,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
});

export default quizSlice.reducer;

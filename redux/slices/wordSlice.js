import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  knownWords: [],
  unKnownWords: [],
};

const wordSlice = createSlice({
  name: 'word',
  initialState,
  reducers: {
    addKnownWord(state, action) {
      state.knownWords.push(action.payload);
    },
    addUnknownWord(state, action) {
      state.unKnownWords.push(action.payload);
    },
    resetArr(state, action) {
      state.knownWords = [];
      state.unKnownWords = [];
    },
  },
});

export const { addKnownWord, addUnknownWord, resetArr } = wordSlice.actions;
export default wordSlice.reducer;

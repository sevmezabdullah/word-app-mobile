import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';
const AUTH_URL = 'http://192.168.1.115:3000/users/login';
const initialState = {
  isLoggedIn: false,
  email: null,
  userName: null,
  status: 'idle',
  token: null,
  message: '',
};
function showToast(message) {
  ToastAndroid.show(message, ToastAndroid.SHORT);
}
const storeToken = async (token) => {
  try {
    const jsonToken = JSON.stringify(token);
    await AsyncStorage.setItem('token', jsonToken);
  } catch (e) {
    // saving error
  }
};
export const signIn = createAsyncThunk('auth/signIn', async (authInfo) => {
  const response = await axios.post(AUTH_URL, authInfo);
  storeToken(response.data.token);

  return response.data;
});
export const checkToken = createAsyncThunk('auth/checkToken', async () => {
  return AsyncStorage.getItem('token');
});
export const logout = createAsyncThunk('auth/logout', async () => {
  await AsyncStorage.removeItem('token');
});

const authSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    setSignIn: (state, action) => {
      state.email = action.payload.email;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.userName = action.payload.userName;
    },
    setSignOut: (state) => {
      state.email = null;
      state.userName = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signIn.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.token = action.payload.token;
        showToast(action.payload.message);
        state.message = action.payload.message;
        state.status = 'success';
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.token = null;
        state.status = 'idle';
      })
      .addCase(checkToken.fulfilled, (state, action) => {
        try {
          if (!action.payload.token) {
            state.token = action.payload.token;
          } else {
            state.token = null;
          }
        } catch (error) {
          state.token = null;
        }
      });
  },
});

export const { setSignIn, setSignOut } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.userAuth.isLoggedIn;
export const token = (state) => state.userAuth.token;
export const selectEmail = (state) => state.userAuth.email;
export const selectUserName = (state) => state.userAuth.userName;
export const message = (state) => state.userAuth.message;

export default authSlice.reducer;

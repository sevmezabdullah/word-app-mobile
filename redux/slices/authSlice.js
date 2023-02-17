import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';
import { emulatorUrls, localUrls, productionUrls } from '../../constants/uri';

const AUTH_URL = emulatorUrls.AUTH_URL;
const REGISTER_URL = emulatorUrls.REGISTER_URL;
const LOGOUT_URL = emulatorUrls.LOGOUT_URL;
const UPDATE_LANG = emulatorUrls.UPDATE_LANG;

const initialState = {
  user: null,
  status: 'idle',
  token: null,
  message: '',
  isVerify: false,
};
function showToast(message) {
  ToastAndroid.showWithGravity(message, ToastAndroid.LONG, ToastAndroid.TOP);
}
const storeToken = async (token) => {
  try {
    const jsonToken = JSON.stringify(token);
    await AsyncStorage.setItem('token', jsonToken);
  } catch (e) {
    // saving error
  }
};

const storeUser = async (user) => {
  try {
    const jsonUser = JSON.stringify(user);
    await AsyncStorage.setItem('user', jsonUser);
  } catch (error) {
    console.log(error);
  }
};

export const getUser = createAsyncThunk('auth/getUser', async () => {
  const user = JSON.parse(await AsyncStorage.getItem('user'));
  return user;
});

export const updateLang = createAsyncThunk(
  'auth/updateLang',
  async (userPref) => {
    const response = await axios.put(UPDATE_LANG, userPref);
    return response.data;
  }
);
export const signIn = createAsyncThunk('auth/signIn', async (authInfo) => {
  const response = await axios.post(AUTH_URL, authInfo);
  if (response.data.isVerify) {
    await AsyncStorage.setItem('email', authInfo.email);
    storeToken(response.data.token);
    storeUser(response.data);
  }
  return response.data;
});
export const checkToken = createAsyncThunk('auth/checkToken', async () => {
  return AsyncStorage.getItem('token');
});
export const logout = createAsyncThunk('auth/logout', async () => {
  const email = await AsyncStorage.getItem('email');
  const response = await axios.post(LOGOUT_URL, {
    userEmail: email,
  });
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('email');
  await AsyncStorage.removeItem('user');
  return response.data;
});

export const register = createAsyncThunk('auth/register', async (user) => {
  const response = await axios.post(REGISTER_URL, user);
  return response.data;
});

const authSlice = createSlice({
  name: 'userAuth',
  initialState,

  extraReducers(builder) {
    builder
      .addCase(signIn.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = 'error';
        showToast('Hesap bulunamadı');
      })
      .addCase(signIn.fulfilled, (state, action) => {
        if (
          action.payload.token !== undefined ||
          action.payload.token !== null
        ) {
          state.token = action.payload.token;
          state.isVerify = action.payload.isVerify;
          state.user = action.payload;
          showToast(action.payload.message);
          state.message = action.payload.message;
          state.status = 'success';
          if (!state.isVerify) {
            state.token = null;
          }
        } else {
          showToast(action.payload.message);
        }
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.token = null;
        state.status = 'idle';
        state.user = null;
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
      })
      .addCase(register.fulfilled, (state, action) => {})
      .addCase(register.rejected, (state, action) => {})
      .addCase(updateLang.fulfilled, (state, action) => {
        state.user.currentLang = action.payload.currentLang;
        state.user.nativeLang = action.payload.nativeLang;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const token = (state) => state.userAuth.token;
export const message = (state) => state.userAuth.message;
export default authSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { ToastAndroid } from 'react-native';
import { emulatorUrls, localUrls, productionUrls } from '../../constants/uri';

const AUTH_URL = localUrls.AUTH_URL;
const REGISTER_URL = localUrls.REGISTER_URL;
const LOGOUT_URL = localUrls.LOGOUT_URL;
const UPDATE_LANG = localUrls.UPDATE_LANG;
const ADD_WORD_USER = localUrls.ADD_WORD_USER;
const ADD_AWARD = localUrls.ADD_AWARD;
const GET_USER_DECK = localUrls.GET_USER_DECK;
const ADD_COMPLETED_QUIZ = localUrls.ADD_COMPLETED_QUIZ;
const RESET_PROCESS = localUrls.RESET_PROCESS;
const CREATE_REQUEST = localUrls.CREATE_REQUEST;
const INCREMENT_EXP = localUrls.INCREMENT_EXP;
const GET_USER_STAT = localUrls.GET_USER_STAT;
const GET_USER_AWARDS = localUrls.GET_USER_AWARDS;
const GET_USER_DAILY_WORD_COUNT = localUrls.GET_USER_DAILY_WORD_COUNT;
const CHANGE_USER_PASSWORD = localUrls.CHANGE_USER_PASSWORD;
const GET_USER_BY_ID = localUrls.GET_USER_BY_ID;

const initialState = {
  user: null,
  id: null,
  status: 'idle',
  token: null,
  message: '',
  exp: 0,
  isVerify: false,
  resetStatus: 'idle',
  requestStatus: 'idle',
  statRequest: 'idle',
  stat: null,
  awards: null,
  dailiyWordCount: 0,
  currentLang: '',
  nativeLang: '',
  categoryAwardsIds: [],
  getUserStatus: 'idle',
};
function showToast(message) {
  ToastAndroid.showWithGravity(message, ToastAndroid.LONG, ToastAndroid.TOP);
}
const storeToken = async (token) => {
  try {
    const jsonToken = JSON.stringify(token);
    await SecureStore.setItemAsync('token', jsonToken);
    /* await AsyncStorage.setItem('token', jsonToken); */
  } catch (e) {
    // saving error
  }
};

const storeUser = async (key, data) => {
  try {
    const jsonData = JSON.stringify(data);
    await SecureStore.setItemAsync(key, jsonData);
  } catch (error) {}
};

export const incrementExp = createAsyncThunk(
  'auth/increment',
  async ({ userId, exp }) => {
    const user = JSON.parse(await SecureStore.getItemAsync('user'));
    const response = await axios.post(INCREMENT_EXP, {
      userId: user.id,
      exp: exp,
    });
    return response.data;
  }
);

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async ({ userId, password }) => {
    const response = await axios.post(CHANGE_USER_PASSWORD, {
      userId,
      password,
    });
    return response.data;
  }
);

export const updateLang = createAsyncThunk(
  'auth/updateLang',
  async (userPref) => {
    const user = JSON.parse(await SecureStore.getItemAsync('user'));
    userPref.userId = user._id;

    const response = await axios.put(UPDATE_LANG, userPref);

    return response.data;
  }
);
export const signIn = createAsyncThunk('auth/signIn', async (authInfo) => {
  const response = await axios.post(AUTH_URL, authInfo);
  const user = response.data;

  if (user.isVerify !== null || user.isVerify !== undefined) {
    storeUser('email', authInfo.email);
    storeUser('user', user);
    return response.data;
  } else {
    return response.data;
  }
});
export const checkToken = createAsyncThunk('auth/checkToken', async () => {
  return SecureStore.getItemAsync('token');
});
export const logout = createAsyncThunk('auth/logout', async () => {
  const email = await SecureStore.getItemAsync('email');
  const response = await axios.post(LOGOUT_URL, {
    userEmail: email,
  });
  await AsyncStorage.clear();
  return response.data;
});

export const register = createAsyncThunk('auth/register', async (user) => {
  const response = await axios.post(REGISTER_URL, user);
  return response.data;
});

export const addWordUser = createAsyncThunk(
  'auth/addWord',
  async ({ knownWords, id }) => {
    const user = JSON.parse(await SecureStore.getItemAsync('user'));
    const response = await axios.post(ADD_WORD_USER, {
      knownWords,
      id: user.id,
    });
    return response.data;
  }
);

export const addAwardtoUser = createAsyncThunk(
  'auth/addAward',
  async ({ awardId, userId }) => {
    const user = JSON.parse(await SecureStore.getItemAsync('user'));
    const response = await axios.post(ADD_AWARD, { awardId, userId: user.id });
    return response.data;
  }
);

export const getUserFromServer = createAsyncThunk(
  'auth/getFromServer',
  async () => {
    const user = JSON.parse(await SecureStore.getItemAsync('user'));

    const response = await axios.get(GET_USER_BY_ID + user.id);

    return response.data;
  }
);

export const resetProcess = createAsyncThunk('auth/resetProcess', async () => {
  const user = JSON.parse(await SecureStore.getItemAsync('user'));
  const response = await axios.post(RESET_PROCESS, { userId: user.id });
  return response.data;
});
export const getUserDailiyWordCount = createAsyncThunk(
  'auth/dailyWordCount',
  async () => {
    const user = JSON.parse(await SecureStore.getItemAsync('user'));
    const response = await axios.get(GET_USER_DAILY_WORD_COUNT + '/' + user.id);

    return response.data;
  }
);
export const getUserStat = createAsyncThunk('auth/userStat', async () => {
  const user = JSON.parse(await SecureStore.getItemAsync('user'));
  const response = await axios.get(GET_USER_STAT + '/' + user.id);
  return response.data;
});

export const getUserAwards = createAsyncThunk('auth/userAwards', async () => {
  const user = JSON.parse(await SecureStore.getItemAsync('user'));

  const response = await axios.get(GET_USER_AWARDS + '/' + user.id);
  return response.data;
});
export const completeQuiz = createAsyncThunk(
  'auth/completeQuiz',
  async ({ result, userId, quizId }) => {
    const user = JSON.parse(await SecureStore.getItemAsync('user'));
    const response = await axios.post(ADD_COMPLETED_QUIZ, {
      userId: user.id,
      result,
      quizId,
    });

    return response.data;
  }
);
export const getUserDeck = createAsyncThunk(
  'auth/getUserDeck',
  async ({ userId }) => {
    const user = JSON.parse(await SecureStore.getItemAsync('user'));
    const link = GET_USER_DECK + '/' + user.id;
    console.log(link);

    const response = await axios.get(GET_USER_DECK + '/' + user._id);
    console.log('🚀 ~ file: authSlice.js:204 ~ response:', response.data);

    return response.data;
  }
);

export const createRequest = createAsyncThunk(
  'auth/request',
  async ({ userId, message }) => {
    const response = await axios.post(CREATE_REQUEST, { userId, message });
    return response.data;
  }
);

const authSlice = createSlice({
  name: 'userAuth',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(signIn.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(signIn.fulfilled, (state, action) => {
        console.log(action.payload);
        if (action.payload.isLogged) {
          if (action.payload !== null || action.payload !== undefined)
            if (
              action.payload.token !== undefined ||
              action.payload.token !== null
            ) {
              state.token = action.payload.token;
              state.isVerify = action.payload.isVerify;
              state.user = action.payload;

              state.message = action.payload.message;

              if (!state.isVerify) {
                state.token = null;
              }
              state.status = 'success';
              storeToken(action.payload.token);
              showToast(action.payload.message);
            }
        } else {
          state.user = null;
          state.token = null;
          state.status = 'success';
          showToast(action.payload.message);
        }
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = 'error';
      })
      /* .addCase(addWordUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
 */
      .addCase(logout.fulfilled, (state, action) => {
        state.token = null;
        state.status = 'idle';
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {})
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
        state.user.nativeLang = action.payload.nativeLang;
        state.user.currentLang = action.payload.currentLang;
        state.currentLang = action.payload.currentLang;
        state.nativeLang = action.payload.nativeLang;
      })

      .addCase(incrementExp.fulfilled, (state, action) => {
        state.exp = action.payload;
      })
      .addCase(getUserDeck.fulfilled, (state, action) => {
        state.categoryAwardsIds = action.payload;
        /* state.user.categoryAwardsIds = action.user.categoryAwardsIds; */
      })
      .addCase(completeQuiz.fulfilled, (state, action) => {})
      .addCase(resetProcess.pending, (state, action) => {
        state.resetStatus = 'pending';
      })
      .addCase(resetProcess.fulfilled, (state, action) => {
        state.resetStatus = 'fullfilled';
      })
      .addCase(getUserFromServer.fulfilled, (state, action) => {
        state.user = action.payload;
        state.getUserStatus = 'fulfilled';
        console.log('Yüklendi');
        state.currentLang = action.payload.currentLang;
        state.nativeLang = action.payload.nativeLang;
        state.categoryAwardsIds = action.payload.categoryAwardsIds;
      })
      .addCase(getUserFromServer.rejected, (state, action) => {
        console.log('Hata meydana geldi', action.payload);
      })

      .addCase(resetProcess.rejected, (state, action) => {})
      .addCase(createRequest.pending, (state, action) => {
        state.requestStatus = 'pending';
      })
      .addCase(createRequest.fulfilled, (state, action) => {
        state.requestStatus = 'fulfilled';
      })
      .addCase(getUserStat.fulfilled, (state, action) => {
        state.stat = action.payload;
        state.statRequest = 'fulfilled';
      })
      .addCase(getUserStat.pending, (state, action) => {
        state.statRequest = 'pending';
      })
      .addCase(getUserAwards.fulfilled, (state, action) => {
        state.awards = action.payload;
      })
      .addCase(getUserDailiyWordCount.fulfilled, (state, action) => {
        state.dailiyWordCount = action.payload.learnedWordCount;
      })
      .addCase(changePassword.rejected, (state, action) => {
        showToast('Şifre değiştirme esnasında bir hata meydana geldi.');
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        showToast('Şifre değiştirme başarılı');
      })
      .addCase(getUserFromServer.pending, (state, action) => {
        state.getUserStatus = 'pending';
      });
  },
});

export const token = (state) => state.userAuth.token;
export const message = (state) => state.userAuth.message;
export default authSlice.reducer;

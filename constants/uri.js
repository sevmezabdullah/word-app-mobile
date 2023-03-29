export const productionUrls = {
  AUTH_URL: '',
  REGISTER_URL: '',
  LOGOUT_URL: '',
  UPDATE_LANG: '',
};
export const emulatorUrls = {
  AUTH_URL: 'http://10.0.2.2:3000/users/login',
  ADD_WORD_USER: 'http://10.0.2.2:3000/users/addWordToKnown',
  REGISTER_URL: 'http://10.0.2.2:3000/users/register',
  LOGOUT_URL: 'http://10.0.2.2:3000/users/logout',
  UPDATE_LANG: 'http://10.0.2.2:3000/users/updateLang',
  GET_CATEGORIES: 'http://10.0.2.2:3000/category/categories',
  GET_BY_ID: 'http://10.0.2.2:3000/category',
  GET_WORDS_BY_CATEGORY_ID: 'http://10.0.2.2:3000/category/getWords/',
  ADD_AWARD: 'http://10.0.2.2:3000/users/addAwardToUser',
  GET_USER_DECK: 'http://10.0.2.2:3000/users/getUserAwardDeck',
  GET_QUIZ_BY_ID: 'http://10.0.2.2:3000/quiz/',
  GET_QUIZ_BY_DIffICULTY: 'http://10.0.2.2:3000/quiz/difficulty/',
  ADD_COMPLETED_QUIZ: 'http://10.0.2.2:3000/quizResult/create',
  RESET_PROCESS: 'http://10.0.2.2:3000/users/resetProcess',
  CREATE_REQUEST: 'http://10.0.2.2:3000/requests/create',
  INCREMENT_EXP: 'http://10.0.2.2:3000/users/incrementExp',
};
export const localUrls = {
  AUTH_URL: 'http://192.168.1.115:3000/users/login',
  REGISTER_URL: 'http://192.168.1.115:3000/users/register',
  LOGOUT_URL: 'http://192.168.1.115:3000/users/logout',
  ADD_WORD_USER: 'http://192.168.1.115:3000/users/addWordToKnown',
  UPDATE_LANG: 'http://192.168.1.115:3000/users/updateLang',
  GET_CATEGORIES: 'http://192.168.1.115:3000/category/categories',
  GET_BY_ID: 'http://192.168.1.115:3000/category',
  GET_WORDS_BY_CATEGORY_ID: 'http://192.168.1.115:3000/category/getWords/',
  ADD_AWARD: 'http://192.168.1.115:3000/users/addAwardToUser',
  GET_USER_DECK: 'http://192.168.1.115:3000/users/getUserAwardDeck',
  GET_QUIZ_BY_ID: 'http://192.168.1.115:3000/quiz/',
  GET_QUIZ_BY_DIffICULTY: 'http://192.168.1.115:3000/quiz/difficulty/',
  ADD_COMPLETED_QUIZ: 'http://192.168.1.115:3000/quizResult/create',
  RESET_PROCESS: 'http://192.168.1.115:3000/users/resetProcess',
  CREATE_REQUEST: 'http://192.168.1.115:3000/requests/create',
  INCREMENT_EXP: 'http://192.168.1.115:3000/users/incrementExp',
};

export const socketURL = 'http://192.168.1.115:3000';

const host = '10.0.2.2';
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
};
export const localUrls = {
  AUTH_URL: 'http://192.168.1.115:3000/users/login',
  REGISTER_URL: 'http://192.168.1.115:3000/users/register',
  LOGOUT_URL: 'http://192.168.1.115:3000/users/logout',
  UPDATE_LANG: 'http://192.168.1.115:3000/users/updateLang',
  GET_CATEGORIES: 'http://192.168.1.115:3000/category/categories',
  GET_BY_ID: 'http://192.168.1.115:3000/category',
  GET_WORDS_BY_CATEGORY_ID: 'http://192.168.1.115:3000/category/getWords/',
};

export const socketURL = 'http://10.0.2.2:3000';

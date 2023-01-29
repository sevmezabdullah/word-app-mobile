import React from 'react';
import { Provider } from 'react-redux';
import AppRoute from './screens/navigations/navigator';
import { store } from './app/store';
export default function App() {
  return (
    <>
      <Provider store={store}>
        <AppRoute />
      </Provider>
    </>
  );
}

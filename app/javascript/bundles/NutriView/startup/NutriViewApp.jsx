import React from 'react';
import { Provider } from 'react-redux';
import ReactOnRails from 'react-on-rails';

const NutriViewApp = () => {
  const store = ReactOnRails.getStore('configureStore');

  return (
    <Provider store={store}>
    </Provider>
  );
};

export default NutriViewApp;

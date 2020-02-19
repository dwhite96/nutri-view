import React from 'react';
import { Provider } from 'react-redux';
import ReactOnRails from 'react-on-rails';

import configureStore from '../store/nutriViewStore';
import App from '../components/App';

const NutriViewApp = () => {
  const store = ReactOnRails.getStore('configureStore');

  return(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default NutriViewApp;

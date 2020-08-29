import React from 'react';
import { Provider } from 'react-redux';
import ReactOnRails from 'react-on-rails';

import LoginContainer from '../containers/LoginContainer';

const LoginApp = () => {
  const store = ReactOnRails.getStore('configureStore');

  return (
    <Provider store={store}>
      <LoginContainer />
    </Provider>
  );
};

export default LoginApp;

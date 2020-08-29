import React from 'react';
import { Provider } from 'react-redux';
import ReactOnRails from 'react-on-rails';

import RegistrationContainer from '../containers/RegistrationContainer';

const RegistrationApp = () => {
  const store = ReactOnRails.getStore('configureStore');

  return (
    <Provider store={store}>
      <RegistrationContainer />
    </Provider>
  );
};

export default RegistrationApp;

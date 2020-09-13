import React from 'react';
import { Provider } from 'react-redux';
import ReactOnRails from 'react-on-rails';

import UserEditContainer from '../containers/UserEditContainer';

const UserEditApp = () => {
  const store = ReactOnRails.getStore('configureStore');

  return (
    <Provider store={store}>
      <UserEditContainer />
    </Provider>
  );
};

export default UserEditApp;

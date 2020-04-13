import React from 'react';
import { Provider } from 'react-redux';
import ReactOnRails from 'react-on-rails';

import TopBar from '../containers/TopBarContainer';

const TopBarApp = () => {
  const store = ReactOnRails.getStore('configureStore');

  return (
    <Provider store={store}>
      <TopBar />
    </Provider>
  );
};

export default TopBarApp;

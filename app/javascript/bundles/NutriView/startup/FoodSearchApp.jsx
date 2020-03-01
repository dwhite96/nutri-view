import React from 'react';
import { Provider } from 'react-redux';
import ReactOnRails from 'react-on-rails';

import FoodSearchInput from '../containers/FoodSearchInputContainer';

const FoodSearchApp = () => {
  const store = ReactOnRails.getStore('configureStore');
  console.log(store.getState());

  return (
    <Provider store={store}>
      <FoodSearchInput />
    </Provider>
  );
};

export default FoodSearchApp;

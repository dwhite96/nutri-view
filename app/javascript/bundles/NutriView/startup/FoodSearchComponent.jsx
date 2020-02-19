import React from 'react';
import { Provider } from 'react-redux';
import ReactOnRails from 'react-on-rails';

import configureStore from '../store/nutriViewStore';
import FoodSearchInput from '../containers/FoodSearchInputContainer';

const FoodSearchComponent = () => {
  const store = ReactOnRails.getStore('configureStore');

  return(
    <Provider store={store}>
      <FoodSearchInput />
    </Provider>
  );
};

export default FoodSearchComponent;

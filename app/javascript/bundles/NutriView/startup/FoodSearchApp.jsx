import React from 'react';
import { Provider } from 'react-redux';
import ReactOnRails from 'react-on-rails';
import { Button } from 'antd';

import Modal from '../containers/Modal';
import { openModal } from '../actions/nutriViewActionCreators';

const FoodSearchApp = () => {
  const store = ReactOnRails.getStore('configureStore');
  console.log(store.getState());

  return (
    <Provider store={store}>
      <div>
        <Button
          onClick={() => store.dispatch(openModal('FOOD_SEARCH_INPUT'))}
          className="clear button"
          type="button"
        >
          Search Food
        </Button>
        <Modal />
      </div>
    </Provider>
  );
};

export default FoodSearchApp;

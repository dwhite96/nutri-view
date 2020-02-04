import { combineReducers } from 'redux';

import { DISPLAY_FOOD_ITEM } from '../constants/nutriViewConstants';

const data = (state = '', action) => {
  switch (action.type) {
    case DISPLAY_FOOD_ITEM:
      return action.text;
    default:
      return state;
  }
};

const reducers = combineReducers({ data });

export default reducers;

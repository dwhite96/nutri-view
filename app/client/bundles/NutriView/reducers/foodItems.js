import { combineReducers } from 'redux';

import {
  UPDATE_MEAL,
} from '../constants/nutriViewConstants';

const updateFoodItems = (state, { foodItems }) => (
  { ...state, foodItems }
);

const foodItemsByID = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_MEAL:
      return updateFoodItems(state, action);
    default:
      return state;
  }
};

const foodItems = combineReducers({
  byId: foodItemsByID,
});

export default foodItems;

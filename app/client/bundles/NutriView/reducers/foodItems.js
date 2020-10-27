import { combineReducers } from 'redux';
import { merge } from 'lodash';

import {
  ADD_FOOD_ITEM_TO_MEAL,
} from '../constants/nutriViewConstants';

const updateFoodItems = (state, { foodItem }) => (
  merge({}, state, foodItem)
);

const foodItemsByID = (state = {}, action) => {
  switch (action.type) {
    case ADD_FOOD_ITEM_TO_MEAL:
      return updateFoodItems(state, action);
    default:
      return state;
  }
};

const foodItems = combineReducers({
  byId: foodItemsByID,
});

export default foodItems;

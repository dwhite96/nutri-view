import { combineReducers } from 'redux';
import { merge } from 'lodash';

import {
  ADD_FOOD_ITEM_TO_MEAL,
} from '../constants/nutriViewConstants';

const mergeMealFoodItem = (state, { mealFoodItem }) => (
  merge({}, state, mealFoodItem)
);

const mealFoodItemsByID = (state = {}, action) => {
  switch (action.type) {
    case ADD_FOOD_ITEM_TO_MEAL:
      return mergeMealFoodItem(state, action);
    default:
      return state;
  }
};

const mealFoodItems = combineReducers({
  byId: mealFoodItemsByID,
});

export default mealFoodItems;

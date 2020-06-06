import { combineReducers } from 'redux';
import _ from 'lodash';

import {
  UPDATE_MEAL,
} from '../constants/nutriViewConstants';

const updateFoodItems = (state, { foodItems }) => (
  _.merge({}, state, foodItems)
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

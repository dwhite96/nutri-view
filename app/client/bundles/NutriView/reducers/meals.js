import { combineReducers } from 'redux';
import merge from 'lodash/merge';

import {
  ADD_MEAL,
  UPDATE_MEAL,
} from '../constants/nutriViewConstants';

const addMeal = (state, action) => {
  const meal = action.data.entities.meals;

  return {
    ...state,
    ...meal,
  };
};

const updateMeal = (state, { meal }) => (
  merge({}, state, meal)
);

const mealsByID = (state = {}, action) => {
  switch (action.type) {
    case ADD_MEAL:
      return addMeal(state, action);
    case UPDATE_MEAL:
      return updateMeal(state, action);
    default:
      return state;
  }
};

const allMeals = (state = [], action) => {
  switch (action.type) {
    case ADD_MEAL:
      return state.concat(action.data.result[0]);
    default:
      return state;
  }
};

const meals = combineReducers({
  byId: mealsByID,
  allIds: allMeals,
});

export default meals;

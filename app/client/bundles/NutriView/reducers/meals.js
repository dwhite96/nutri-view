import { combineReducers } from 'redux';
import _ from 'lodash';

import {
  ADD_MEAL,
  UPDATE_MEAL,
  DELETE_MEAL_SUCCESS,
} from '../constants/nutriViewConstants';

const addMeal = (state, action) => {
  const meal = action.data.entities.meals;

  return {
    ...state,
    ...meal,
  };
};

const updateMeal = (state, { meal }) => ({
  ...state,
  [meal.id]: meal,
});

const deleteMeal = (state, action) => {
  const { mealId } = action.data;

  const newState = { ...state };
  delete newState[mealId];
  return newState;
};

const mealsByID = (state = {}, action) => {
  switch (action.type) {
    case ADD_MEAL:
      return addMeal(state, action);
    case UPDATE_MEAL:
      return updateMeal(state, action);
    case DELETE_MEAL_SUCCESS:
      return deleteMeal(state, action);
    default:
      return state;
  }
};

const removeMealId = (state, action) => {
  const { mealId } = action.data;

  const newState = [...state];
  _.remove(newState, function (n) { return n === mealId; });

  return newState;
};

const allMeals = (state = [], action) => {
  switch (action.type) {
    case ADD_MEAL:
      return state.concat(action.data.result[0]);
    case DELETE_MEAL_SUCCESS:
      return removeMealId(state, action);
    default:
      return state;
  }
};

const meals = combineReducers({
  byId: mealsByID,
  allIds: allMeals,
});

export default meals;

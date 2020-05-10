/* eslint-disable import/prefer-default-export */
import ReactOnRails from 'react-on-rails';

import { CALL_API } from '../middleware/api';
import {
  ADD_MEAL_REQUEST,
  ADD_MEAL_SUCCESS,
  ADD_MEAL_FAILURE,
  ADD_FOOD_ITEM_BUTTON_CLICKED,
  FOOD_ITEM_ADDED,
  FOOD_ITEM_REMOVED,
} from '../constants/nutriViewConstants';

const mealAdded = (mealNumber) => ({
  [CALL_API]: {
    types: [
      ADD_MEAL_REQUEST,
      ADD_MEAL_SUCCESS,
      ADD_MEAL_FAILURE,
    ],
    url: 'http://localhost:3000/meals',
    request: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': ReactOnRails.authenticityToken(),
      },
      body: JSON.stringify({
        meal: { number: mealNumber },
      }),
    },
  },
});

export const addMealButtonClicked = (mealNumber) => (dispatch) => (
  dispatch(mealAdded(mealNumber))
);

export const addFoodItemButtonClicked = () => ({
  type: ADD_FOOD_ITEM_BUTTON_CLICKED,
});

export const foodItemAdded = () => ({
  type: FOOD_ITEM_ADDED,
});

export const foodItemRemoved = () => ({
  type: FOOD_ITEM_REMOVED,
});

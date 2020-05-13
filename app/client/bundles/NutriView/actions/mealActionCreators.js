/* eslint-disable import/prefer-default-export */
import ReactOnRails from 'react-on-rails';

import { CALL_API } from '../middleware/api';
import { Schemas } from '../middleware/schema';
import {
  ADD_MEAL_REQUEST,
  ADD_MEAL_SUCCESS,
  ADD_MEAL_FAILURE,
  ADD_FOOD_ITEM_REQUEST,
  ADD_FOOD_ITEM_SUCCESS,
  ADD_FOOD_ITEM_FAILURE,
  SAVED_FOOD_ITEMS_FETCH_REQUEST,
  SAVED_FOOD_ITEMS_FETCH_SUCCESS,
  SAVED_FOOD_ITEMS_FETCH_FAILURE,
  // FOOD_ITEM_ADDED,
  // FOOD_ITEM_REMOVED,
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

const foodItemAdded = (foodItemId) => ({
  [CALL_API]: {
    types: [
      ADD_FOOD_ITEM_REQUEST,
      ADD_FOOD_ITEM_SUCCESS,
      ADD_FOOD_ITEM_FAILURE,
    ],
    url: `http://localhost:3000/meals/${foodItemId}`,
    request: {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': ReactOnRails.authenticityToken(),
      },
    },
  },
});

const savedFoodItemsFetchRequested = () => ({
  [CALL_API]: {
    types: [
      SAVED_FOOD_ITEMS_FETCH_REQUEST,
      SAVED_FOOD_ITEMS_FETCH_SUCCESS,
      SAVED_FOOD_ITEMS_FETCH_FAILURE,
    ],
    url: 'http://localhost:3000/food_items.json',
    request: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': ReactOnRails.authenticityToken(),
      },
    },
    schema: Schemas.FOOD_ITEMS,
  },
});

export const addFoodItemClicked = () => (dispatch) => (
  dispatch(savedFoodItemsFetchRequested())
);

export const foodItemRemoved = () => ({
  type: FOOD_ITEM_REMOVED,
});

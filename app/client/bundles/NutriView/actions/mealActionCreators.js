/* eslint-disable import/prefer-default-export */
import ReactOnRails from 'react-on-rails';

import { CALL_API } from '../middleware/api';
import { Schemas } from '../middleware/schema';
import {
  ADD_MEAL_REQUEST,
  ADD_MEAL_SUCCESS,
  ADD_MEAL_FAILURE,
  SAVED_FOOD_ITEMS_FETCH_REQUEST,
  SAVED_FOOD_ITEMS_FETCH_SUCCESS,
  SAVED_FOOD_ITEMS_FETCH_FAILURE,
  SAVE_FOOD_ITEM_TO_MEAL_REQUEST,
  SAVE_FOOD_ITEM_TO_MEAL_SUCCESS,
  SAVE_FOOD_ITEM_TO_MEAL_FAILURE,
} from '../constants/nutriViewConstants';

// Post new meal to Rails database
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

// Add new meal thunk
export const addMealButtonClicked = (mealNumber) => (dispatch) => (
  dispatch(mealAdded(mealNumber))
);

// Request all saved food items from Rails database
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

// Open add food item to meal modal and fetch Rails food items thunk
export const addFoodItemClicked = () => (dispatch) => (
  dispatch(savedFoodItemsFetchRequested())
);

// Patch request to add food item to meal in Rails database
const saveFoodItemToMeal = (selectedFood, meal) => ({
  [CALL_API]: {
    types: [
      SAVE_FOOD_ITEM_TO_MEAL_REQUEST,
      SAVE_FOOD_ITEM_TO_MEAL_SUCCESS,
      SAVE_FOOD_ITEM_TO_MEAL_FAILURE,
    ],
    url: `http://localhost:3000/meals/${meal.id}.json`,
    request: {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': ReactOnRails.authenticityToken(),
      },
      body: JSON.stringify({
        meal: { food_item_id: selectedFood },
      }),
      schema: Schemas.MEALS,
    },
  },
});

// Add food item to meal thunk
export const addSelectedFoodItemToMealClicked = (selectedFood, meal) => (dispatch) => (
  dispatch(saveFoodItemToMeal(selectedFood, meal))
);

export const foodItemRemoved = () => ({
  type: FOOD_ITEM_REMOVED,
});

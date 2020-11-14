/* eslint-disable import/prefer-default-export */
import ReactOnRails from 'react-on-rails';

import { CALL_API } from '../middleware/api';
import { normalizeData, Schemas } from '../utilities/schemas';
import {
  CREATE_MEAL_REQUEST,
  CREATE_MEAL_SUCCESS,
  CREATE_MEAL_FAILURE,
  DELETE_MEAL_REQUEST,
  DELETE_MEAL_SUCCESS,
  DELETE_MEAL_FAILURE,
  RAILS_FOOD_ITEMS_FETCH_REQUEST,
  RAILS_FOOD_ITEMS_FETCH_SUCCESS,
  RAILS_FOOD_ITEMS_FETCH_FAILURE,
  SAVE_FOOD_ITEM_TO_MEAL_REQUEST,
  SAVE_FOOD_ITEM_TO_MEAL_SUCCESS,
  SAVE_FOOD_ITEM_TO_MEAL_FAILURE,
  DELETE_FOOD_ITEM_FROM_MEAL_REQUEST,
  DELETE_FOOD_ITEM_FROM_MEAL_SUCCESS,
  DELETE_FOOD_ITEM_FROM_MEAL_FAILURE,
  ADD_MEAL,
  ADD_FOOD_ITEM_TO_MEAL,
  SUBTRACT_FOOD_ITEM_FROM_MEAL,
} from '../constants/nutriViewConstants';

// Post new meal to Rails database
const mealAdded = () => ({
  [CALL_API]: {
    types: [
      CREATE_MEAL_REQUEST,
      CREATE_MEAL_SUCCESS,
      CREATE_MEAL_FAILURE,
    ],
    url: '/meals.json',
    request: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': ReactOnRails.authenticityToken(),
      },
    },
  },
});

const addMeal = (data) => ({
  type: ADD_MEAL,
  data,
});

// Add new meal thunk
export const addMealButtonClicked = () => (dispatch) => (
  dispatch(mealAdded())
    .then(
      (response) => {
        if (response.data) {
          const normalizedData = normalizeData(response.data, Schemas.MEALS);

          dispatch(addMeal(normalizedData));
        }
      },
    )
);

// Delete meal from Rails database
const mealDeleted = (meal) => ({
  [CALL_API]: {
    types: [
      DELETE_MEAL_REQUEST,
      DELETE_MEAL_SUCCESS,
      DELETE_MEAL_FAILURE,
    ],
    sharedStateData: meal,
    url: `/meals/${meal.id}.json`,
    request: {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': ReactOnRails.authenticityToken(),
      },
    },
  },
});

// Delete meal thunk
export const deleteMealClicked = (meal) => (dispatch) => (
  dispatch(mealDeleted(meal))
);

// Request all saved food items from Rails database
const railsFoodItemsFetchRequested = () => ({
  [CALL_API]: {
    types: [
      RAILS_FOOD_ITEMS_FETCH_REQUEST,
      RAILS_FOOD_ITEMS_FETCH_SUCCESS,
      RAILS_FOOD_ITEMS_FETCH_FAILURE,
    ],
    url: '/food_items.json',
    request: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': ReactOnRails.authenticityToken(),
      },
    },
  },
});

// Open add food item to meal modal and fetch Rails food items thunk
export const addFoodItemClicked = () => (dispatch) => (
  dispatch(railsFoodItemsFetchRequested())
);

// Patch request to add food item to meal in Rails database
const saveFoodItemToMealRequested = (foodItemId, mealId) => ({
  [CALL_API]: {
    types: [
      SAVE_FOOD_ITEM_TO_MEAL_REQUEST,
      SAVE_FOOD_ITEM_TO_MEAL_SUCCESS,
      SAVE_FOOD_ITEM_TO_MEAL_FAILURE,
    ],
    url: `/meals/${mealId}/add_food_item.json`,
    request: {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': ReactOnRails.authenticityToken(),
      },
      body: JSON.stringify({
        meal: { food_item_id: foodItemId },
      }),
    },
  },
});

const addFoodItemToDisplayedMeal = (mealId, foodItem) => ({
  type: ADD_FOOD_ITEM_TO_MEAL,
  mealId,
  foodItem,
});

// Add food item to meal thunk
export const addSelectedFoodItemToMealClicked = (selectedFood, mealId) => (dispatch) => (
  dispatch(saveFoodItemToMealRequested(selectedFood, mealId))
    .then(
      (response) => {
        if (response.data) {
          const normalizedData = normalizeData(response.data, Schemas.FOOD_ITEMS);

          dispatch(addFoodItemToDisplayedMeal(
            mealId,
            normalizedData.entities.foodItems,
          ));
        }
      },
    )
);

// Patch request to delete food item from meal in Rails database
const deleteFoodItemFromMealRequested = (foodItemId, mealId) => ({
  [CALL_API]: {
    types: [
      DELETE_FOOD_ITEM_FROM_MEAL_REQUEST,
      DELETE_FOOD_ITEM_FROM_MEAL_SUCCESS,
      DELETE_FOOD_ITEM_FROM_MEAL_FAILURE,
    ],
    url: `/meals/${mealId}/remove_food_item.json`,
    request: {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': ReactOnRails.authenticityToken(),
      },
      body: JSON.stringify({
        meal: { food_item_id: foodItemId },
      }),
    },
  },
});

const removeFoodItemFromDisplayedMeal = (mealId, foodItem) => ({
  type: SUBTRACT_FOOD_ITEM_FROM_MEAL,
  mealId,
  foodItem,
});

// Remove food item from meal thunk
export const removeFromMealButtonClicked = (foodItem, mealId) => (dispatch) => (
  dispatch(deleteFoodItemFromMealRequested(foodItem, mealId))
    .then(
      (response) => {
        if (response.data) {
          const normalizedData = normalizeData(response.data, Schemas.FOOD_ITEMS);

          dispatch(removeFoodItemFromDisplayedMeal(
            mealId,
            normalizedData.entities.foodItems,
          ));
        }
      },
    )
);

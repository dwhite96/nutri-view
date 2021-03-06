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
  SAVE_FOOD_ITEM_TO_MEAL_REQUEST,
  SAVE_FOOD_ITEM_TO_MEAL_SUCCESS,
  SAVE_FOOD_ITEM_TO_MEAL_FAILURE,
  DELETE_FOOD_ITEM_FROM_MEAL_REQUEST,
  DELETE_FOOD_ITEM_FROM_MEAL_SUCCESS,
  DELETE_FOOD_ITEM_FROM_MEAL_FAILURE,
  ADD_MEAL,
  ADD_FOOD_ITEM_TO_MEAL,
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

// Put request to add food item to meal in Rails database
const saveFoodItemToMealRequested = (selectedFood, mealId, foodData) => ({
  [CALL_API]: {
    types: [
      SAVE_FOOD_ITEM_TO_MEAL_REQUEST,
      SAVE_FOOD_ITEM_TO_MEAL_SUCCESS,
      SAVE_FOOD_ITEM_TO_MEAL_FAILURE,
    ],
    url: '/meal_food_items.json',
    request: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': ReactOnRails.authenticityToken(),
      },
      body: JSON.stringify({
        meal_id: mealId,
        food_item_id: selectedFood,
        servings: foodData.servings,
      }),
    },
  },
});

const addFoodItemToDisplayedMeal = (mealId, mealFoodItem, foodItem) => ({
  type: ADD_FOOD_ITEM_TO_MEAL,
  mealId,
  mealFoodItem,
  foodItem,
});

// Add food item to meal thunk
export const addSelectedFoodItemToMealClicked = (selectedFood, mealId, servings) => (dispatch) => (
  dispatch(saveFoodItemToMealRequested(selectedFood, mealId, servings))
    .then(
      (response) => {
        if (response.data) {
          const normalizedMealFoodItem = normalizeData(
            response.data.mealFoodItem,
            Schemas.MEAL_FOOD_ITEMS,
          );

          const normalizedFoodItem = normalizeData(response.data.foodItem, Schemas.FOOD_ITEMS);

          dispatch(addFoodItemToDisplayedMeal(
            mealId,
            normalizedMealFoodItem.entities.mealFoodItems,
            normalizedFoodItem.entities.foodItems,
          ));
        }
      },
    )
);

// Delete request to delete food item from meal in Rails database
const deleteFoodItemFromMealRequested = (foodItem, mealId) => ({
  [CALL_API]: {
    types: [
      DELETE_FOOD_ITEM_FROM_MEAL_REQUEST,
      DELETE_FOOD_ITEM_FROM_MEAL_SUCCESS,
      DELETE_FOOD_ITEM_FROM_MEAL_FAILURE,
    ],
    sharedStateData: foodItem,
    url: '/meal_food_items.json',
    request: {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': ReactOnRails.authenticityToken(),
      },
      body: JSON.stringify({
        meal_id: mealId,
        food_item_id: foodItem.id,
      }),
    },
  },
});

// Remove food item from meal thunk
export const removeFromMealButtonClicked = (foodItem, mealId) => (dispatch) => (
  dispatch(deleteFoodItemFromMealRequested(foodItem, mealId))
);

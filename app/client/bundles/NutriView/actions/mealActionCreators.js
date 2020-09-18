/* eslint-disable import/prefer-default-export */
import ReactOnRails from 'react-on-rails';

import { CALL_API } from '../middleware/api';
import { Schemas } from '../middleware/schema';
import {
  normalizeData,
  baseNutrientsData,
  calculateMealNutrients,
} from '../utilities/nutriViewUtilities';
import {
  ADD_MEAL_REQUEST,
  ADD_MEAL_SUCCESS,
  ADD_MEAL_FAILURE,
  DELETE_MEAL_REQUEST,
  DELETE_MEAL_SUCCESS,
  DELETE_MEAL_FAILURE,
  RAILS_FOOD_ITEMS_FETCH_REQUEST,
  RAILS_FOOD_ITEMS_FETCH_SUCCESS,
  RAILS_FOOD_ITEMS_FETCH_FAILURE,
  ADD_FOOD_ITEM_TO_MEAL_REQUEST,
  ADD_FOOD_ITEM_TO_MEAL_SUCCESS,
  ADD_FOOD_ITEM_TO_MEAL_FAILURE,
  REMOVE_FOOD_ITEM_FROM_MEAL_REQUEST,
  REMOVE_FOOD_ITEM_FROM_MEAL_SUCCESS,
  REMOVE_FOOD_ITEM_FROM_MEAL_FAILURE,
  ADD_MEAL,
  UPDATE_MEAL,
} from '../constants/nutriViewConstants';
import { updateTotal } from './nutriViewActionCreators';

// Post new meal to Rails database
const mealAdded = () => ({
  [CALL_API]: {
    types: [
      ADD_MEAL_REQUEST,
      ADD_MEAL_SUCCESS,
      ADD_MEAL_FAILURE,
    ],
    url: 'http://localhost:3000/meals.json',
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
export const addMealButtonClicked = () => (dispatch, getState) => (
  dispatch(mealAdded())
    .then(
      (response) => {
        if (response.data) {
          const normalizedData = normalizeData(response.data, Schemas.MEALS);
          const newMealIndex = Object.keys(normalizedData.entities.meals)[0];

          normalizedData.entities.meals[newMealIndex].nutrientsData = baseNutrientsData();

          dispatch(addMeal(normalizedData));
        }
      },
    )
    .then(
      () => {
        const { meals } = getState(); // Using getState() to simply read meals data
        dispatch(updateTotal(meals));
      },
    )
);

// Delete meal from Rails database
const mealDeleted = (mealId) => ({
  [CALL_API]: {
    types: [
      DELETE_MEAL_REQUEST,
      DELETE_MEAL_SUCCESS,
      DELETE_MEAL_FAILURE,
    ],
    url: `http://localhost:3000/meals/${mealId}.json`,
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
export const deleteMealClicked = (mealId) => (dispatch, getState) => (
  dispatch(mealDeleted(mealId))
    .then(
      () => {
        window.location = '/'; // Redirect to root after deleting meal - successful or not
      },
    )
);

// Request all saved food items from Rails database
const railsFoodItemsFetchRequested = () => ({
  [CALL_API]: {
    types: [
      RAILS_FOOD_ITEMS_FETCH_REQUEST,
      RAILS_FOOD_ITEMS_FETCH_SUCCESS,
      RAILS_FOOD_ITEMS_FETCH_FAILURE,
    ],
    url: 'http://localhost:3000/food_items.json',
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
const addFoodItemToMeal = (foodItemId, mealId) => ({
  [CALL_API]: {
    types: [
      ADD_FOOD_ITEM_TO_MEAL_REQUEST,
      ADD_FOOD_ITEM_TO_MEAL_SUCCESS,
      ADD_FOOD_ITEM_TO_MEAL_FAILURE,
    ],
    url: `http://localhost:3000/meals/${mealId}/add_food_item.json`,
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

const updateMeal = (meal, foodItems) => ({
  type: UPDATE_MEAL,
  meal,
  foodItems: foodItems.byId,
});

// Add food item to meal thunk
export const addSelectedFoodItemToMealClicked = (selectedFood, mealId) => (dispatch, getState) => (
  dispatch(addFoodItemToMeal(selectedFood, mealId))
    .then(
      (response) => {
        if (response.data) {
          const normalizedData = normalizeData(response.data, Schemas.MEALS);
          const updatedMeal = normalizedData.entities.meals[mealId];
          const foodItems = {
            byId: normalizedData.entities.foodItems,
          };

          calculateMealNutrients(updatedMeal, foodItems);

          dispatch(updateMeal(updatedMeal, foodItems));
        }
      },
    )
    .then(
      () => {
        const { meals } = getState(); // Using getState() to simply read meals data
        dispatch(updateTotal(meals));
      },
    )
);

// Patch request to delete food item from meal in Rails database
const removeFoodItemFromMeal = (foodItemId, mealId) => ({
  [CALL_API]: {
    types: [
      REMOVE_FOOD_ITEM_FROM_MEAL_REQUEST,
      REMOVE_FOOD_ITEM_FROM_MEAL_SUCCESS,
      REMOVE_FOOD_ITEM_FROM_MEAL_FAILURE,
    ],
    url: `http://localhost:3000/meals/${mealId}/remove_food_item.json`,
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

// Remove food item from meal thunk
export const removeFromMealButtonClicked = (foodItem, mealId) => (dispatch, getState) => (
  dispatch(removeFoodItemFromMeal(foodItem, mealId))
    .then(
      (response) => {
        if (response.data) {
          const normalizedData = normalizeData(response.data, Schemas.MEALS);
          const updatedMeal = normalizedData.entities.meals[mealId];
          const foodItems = {
            byId: normalizedData.entities.foodItems,
          };

          calculateMealNutrients(updatedMeal, foodItems);

          dispatch(updateMeal(updatedMeal, foodItems));
        }
      },
    )
    .then(
      () => {
        const { meals } = getState(); // Using getState() to simply read meals data
        dispatch(updateTotal(meals));
      },
    )
);

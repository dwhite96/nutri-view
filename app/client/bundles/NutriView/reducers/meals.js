import { combineReducers } from 'redux';
import produce from 'immer';
import { remove, keys, without } from 'lodash';

import {
  addEachNutrientValues,
  subtractEachNutrientValues,
} from '../utilities/nutriViewUtilities';
import {
  ADD_MEAL,
  ADD_FOOD_ITEM_TO_MEAL,
  SUBTRACT_FOOD_ITEM_FROM_MEAL,
  DELETE_MEAL_SUCCESS,
} from '../constants/nutriViewConstants';

const addMeal = (state, action) => {
  const meal = action.data.entities.meals;

  return {
    ...state,
    ...meal,
  };
};

const addFoodItemNutrientsToMeal = (state, { mealId, foodItem }) => (
  produce(state, (draft) => {
    const meal = draft[mealId];

    const foodItemId = Number(keys(foodItem)[0]);

    const foodItemNutrients = foodItem[foodItemId].data.labelNutrients;

    meal.nutrientsData = addEachNutrientValues(meal.nutrientsData, foodItemNutrients);

    meal.foodItems = meal.foodItems.concat(foodItemId);
  })
);

const subtractFoodItemNutrientsFromMeal = (state, { mealId, foodItem }) => (
  produce(state, (draft) => {
    const meal = draft[mealId];

    const foodItemId = Number(keys(foodItem)[0]);

    const foodItemNutrients = foodItem[foodItemId].data.labelNutrients;

    meal.nutrientsData = subtractEachNutrientValues(meal.nutrientsData, foodItemNutrients);

    meal.foodItems = without(meal.foodItems, foodItemId);
  })
);

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
    case ADD_FOOD_ITEM_TO_MEAL:
      return addFoodItemNutrientsToMeal(state, action);
    case SUBTRACT_FOOD_ITEM_FROM_MEAL:
      return subtractFoodItemNutrientsFromMeal(state, action);
    case DELETE_MEAL_SUCCESS:
      return deleteMeal(state, action);
    default:
      return state;
  }
};

const removeMealId = (state, action) => {
  const { mealId } = action.data;

  const newState = [...state];

  remove(newState, (n) => n === mealId);

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

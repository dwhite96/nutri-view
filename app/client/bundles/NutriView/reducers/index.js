import { combineReducers } from 'redux';
import { produce } from 'immer';
import { keys, hasIn } from 'lodash';

import {
  FOOD_SEARCH_SUCCESS,
  FOOD_SEARCH_FAILURE,
  FOOD_FETCH_SUCCESS,
  FOOD_FETCH_FAILURE,
  SAVE_FOOD_SUCCESS,
  SAVE_FOOD_FAILURE,
  DELETE_MEAL_SUCCESS,
  NUTRI_VIEW_DATABASE_SEARCH_SUCCESS,
  CLEAR_FOOD_SEARCH_LIST,
  ADD_FOOD_ITEM_TO_MEAL,
  DELETE_FOOD_ITEM_FROM_MEAL_SUCCESS,
} from '../constants/nutriViewConstants';

import meals from './meals';
import mealFoodItems from './mealFoodItems';
import foodItems from './foodItems';
import nutrientTypes from './nutrientTypes';
import {
  addEachNutrientValues,
  subtractEachNutrientValues,
  adjustByServings,
} from '../utilities/nutriViewUtilities';

const foodSearchInput = (state = { response: {} }, action) => {
  switch (action.type) {
    case FOOD_SEARCH_SUCCESS:
      return {
        ...state,
        response: action.data,
      };
    case FOOD_SEARCH_FAILURE:
      return {
        ...state,
        response: action.error,
      };
    case FOOD_FETCH_SUCCESS:
      return {
        ...state,
        response: action.data,
      };
    case FOOD_FETCH_FAILURE:
      return {
        ...state,
        response: action.error,
      };
    case SAVE_FOOD_SUCCESS:
      return {
        ...state,
        response: action.data,
      };
    case SAVE_FOOD_FAILURE:
      return {
        ...state,
        response: {
          error: {
            data: action.error.data,
            code: 'HTTP Status Code 422: Unprocessable Entity',
          },
        },
      };
    case CLEAR_FOOD_SEARCH_LIST:
      return {
        ...state,
        response: {},
      };
    default:
      return state;
  }
};

const railsFoodList = (state = [], action) => {
  switch (action.type) {
    case NUTRI_VIEW_DATABASE_SEARCH_SUCCESS:
      return [
        ...state,
        ...action.data.food_items,
      ];
    case CLEAR_FOOD_SEARCH_LIST:
      return [];
    default:
      return state;
  }
};

const addFoodItemNutrientsToTotal = (state, { mealFoodItem, foodItem }) => (
  produce(state, (draft) => {
    const mealFoodItemId = Number(keys(mealFoodItem)[0]);

    const foodItemId = Number(keys(foodItem)[0]);

    const foodItemNutrients = foodItem[foodItemId].data.labelNutrients;

    const adjustedFoodItemNutrients = adjustByServings(
      foodItemNutrients,
      mealFoodItem[mealFoodItemId].servings,
    );

    draft.nutrientsData = addEachNutrientValues(draft.nutrientsData, adjustedFoodItemNutrients);
  })
);

const subtractFoodItemNutrientsFromTotal = (state, action) => (
  produce(state, (draft) => {
    const foodItemNutrients = action.sharedStateData.data.labelNutrients;

    const adjustedFoodItemNutrients = adjustByServings(
      foodItemNutrients,
      action.data.servings,
    );

    draft.nutrientsData = subtractEachNutrientValues(
      draft.nutrientsData,
      adjustedFoodItemNutrients,
    );
  })
);

const subtractMealNutrientsFromTotal = (state, { sharedStateData }) => (
  produce(state, (draft) => {
    const foodItemNutrients = sharedStateData.nutrientsData;

    draft.nutrientsData = subtractEachNutrientValues(draft.nutrientsData, foodItemNutrients);
  })
);

const total = (state = {}, action) => {
  switch (action.type) {
    case DELETE_MEAL_SUCCESS:
      return subtractMealNutrientsFromTotal(state, action);
    case ADD_FOOD_ITEM_TO_MEAL:
      return addFoodItemNutrientsToTotal(state, action);
    case DELETE_FOOD_ITEM_FROM_MEAL_SUCCESS:
      return subtractFoodItemNutrientsFromTotal(state, action);
    default:
      return state;
  }
};

const dataFetchStatus = (state = 'idle', action) => {
  const { type } = action;

  if (type.includes('REQUEST')) {
    return 'loading';
  }

  if (type.includes('SUCCESS')) {
    return 'idle';
  }

  if (type.includes('FAILURE')) {
    return 'idle';
  }

  return state;
};

const dataFetchResponseMessages = (state = {}, action) => {
  const { type, error } = action;

  if (type.includes('FAILURE') && hasIn(error, 'error.message')) {
    return {
      ...state,
      ...{
        error: error.error.message,
      },
    };
  }

  if (type.includes('FAILURE') && hasIn(error, 'error')) {
    return {
      ...state,
      ...action.error,
    };
  }

  return state;
};

const reducers = combineReducers({
  foodSearchInput,
  railsFoodList,
  meals,
  mealFoodItems,
  foodItems,
  nutrientTypes,
  total,
  dataFetchStatus,
  dataFetchResponseMessages,
});

export default reducers;

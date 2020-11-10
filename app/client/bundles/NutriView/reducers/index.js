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
  RAILS_FOOD_ITEMS_FETCH_SUCCESS,
  ADD_FOOD_ITEM_TO_MEAL,
  SUBTRACT_FOOD_ITEM_FROM_MEAL,
} from '../constants/nutriViewConstants';

import meals from './meals';
import foodItems from './foodItems';
import nutrientTypes from './nutrientTypes';
import {
  addEachNutrientValues,
  subtractEachNutrientValues,
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
    default:
      return state;
  }
};

const railsFoodList = (state = [], action) => {
  switch (action.type) {
    case RAILS_FOOD_ITEMS_FETCH_SUCCESS:
      return {
        ...state,
        response: action.data,
      };
    default:
      return state;
  }
};

const addFoodItemNutrientsToTotal = (state, { foodItem }) => (
  produce(state, (draft) => {
    const foodItemId = Number(keys(foodItem)[0]);

    const foodItemNutrients = foodItem[foodItemId].data.labelNutrients;

    draft.nutrientsData = addEachNutrientValues(draft.nutrientsData, foodItemNutrients);
  })
);

const subtractFoodItemNutrientsFromTotal = (state, { foodItem }) => (
  produce(state, (draft) => {
    const foodItemId = Number(keys(foodItem)[0]);

    const foodItemNutrients = foodItem[foodItemId].data.labelNutrients;

    draft.nutrientsData = subtractEachNutrientValues(draft.nutrientsData, foodItemNutrients);
  })
);

const total = (state = {}, action) => {
  switch (action.type) {
    case ADD_FOOD_ITEM_TO_MEAL:
      return addFoodItemNutrientsToTotal(state, action);
    case SUBTRACT_FOOD_ITEM_FROM_MEAL:
      return subtractFoodItemNutrientsFromTotal(state, action);
    default:
      return state;
  }
};

const dataFetchStatus = (state = 'idle', action) => {
  switch (action.type.includes('REQUEST')) {
    case true:
      return 'loading';
    case false:
      return 'idle';
    default:
      return state;
  }
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
  foodItems,
  nutrientTypes,
  total,
  dataFetchStatus,
  dataFetchResponseMessages,
});

export default reducers;

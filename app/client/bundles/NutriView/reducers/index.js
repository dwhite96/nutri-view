import { combineReducers } from 'redux';
import { produce } from 'immer';
import { keys } from 'lodash';

import {
  FOOD_SEARCH_REQUEST,
  FOOD_SEARCH_SUCCESS,
  FOOD_SEARCH_FAILURE,
  FOOD_FETCH_REQUEST,
  FOOD_FETCH_SUCCESS,
  FOOD_FETCH_FAILURE,
  SAVE_FOOD_REQUEST,
  SAVE_FOOD_SUCCESS,
  SAVE_FOOD_FAILURE,
  RAILS_FOOD_ITEMS_FETCH_REQUEST,
  RAILS_FOOD_ITEMS_FETCH_SUCCESS,
  RAILS_FOOD_ITEMS_FETCH_FAILURE,
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

// const rootReducer = (state = {}, action) => {
//   switch (action.type) {
//     case SAVE_FOOD_ITEM_TO_MEAL_REQUEST:
//       return {
//         meals: action.data,
//       };
//     default:
//       return state;
//   }
// };

const foodSearchInput = (state = { isFetching: false, response: {} }, action) => {
  switch (action.type) {
    case FOOD_SEARCH_REQUEST:
      return {
        ...state,
        isFetching: true,
        response: {},
      };
    case FOOD_SEARCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        response: action.data,
      };
    case FOOD_SEARCH_FAILURE:
      return {
        ...state,
        isFetching: false,
        response: action.error,
      };
    case FOOD_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
        response: {},
      };
    case FOOD_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        response: action.data,
      };
    case FOOD_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false,
        response: action.error,
      };
    case SAVE_FOOD_REQUEST:
      return {
        ...state,
        isFetching: true,
        response: {},
      };
    case SAVE_FOOD_SUCCESS:
      return {
        ...state,
        isFetching: false,
        response: action.data,
      };
    case SAVE_FOOD_FAILURE:
      return {
        ...state,
        isFetching: false,
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
    case RAILS_FOOD_ITEMS_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case RAILS_FOOD_ITEMS_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        response: action.data,
      };
    case RAILS_FOOD_ITEMS_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false,
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

const reducers = combineReducers({
  foodSearchInput,
  railsFoodList,
  meals,
  foodItems,
  nutrientTypes,
  total,
});

export default reducers;

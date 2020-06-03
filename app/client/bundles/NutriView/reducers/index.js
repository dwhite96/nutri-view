import { combineReducers } from 'redux';

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
} from '../constants/nutriViewConstants';

import meals from './meals';
import foodItems from './foodItems';

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

const reducers = combineReducers({
  foodSearchInput,
  railsFoodList,
  foodItems,
  meals,
});

export default reducers;

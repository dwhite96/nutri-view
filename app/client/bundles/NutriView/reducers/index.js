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
} from '../constants/nutriViewConstants';

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

const foodItems = (state = [], action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const reducers = combineReducers({
  foodSearchInput,
  foodItems,
});

export default reducers;

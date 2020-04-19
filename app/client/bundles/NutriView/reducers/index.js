import { combineReducers } from 'redux';

import {
  FOOD_REQUEST,
  FOOD_SUCCESS,
  FOOD_FAILURE,
  FOOD_POST_FAILURE,
} from '../constants/nutriViewConstants';

const foodSearchInput = (state = { isFetching: false, response: {} }, action) => {
  switch (action.type) {
    case FOOD_REQUEST:
      return {
        ...state,
        isFetching: true,
        response: {},
      };
    case FOOD_SUCCESS:
      return {
        ...state,
        isFetching: false,
        response: action.data,
      };
    case FOOD_FAILURE:
      return {
        ...state,
        isFetching: false,
        response: action.error,
      };
    case FOOD_POST_FAILURE:
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

import { combineReducers } from 'redux';

import {
  OPEN_MODAL,
  CLOSE_MODAL,
  FOOD_REQUEST,
  FOOD_SUCCESS,
  FOOD_FAILURE,
  FOOD_POST_FAILURE,
} from '../constants/nutriViewConstants';

const modal = (state = { isOpen: false, modalType: null }, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        isOpen: true,
        modalType: action.modalType,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        isOpen: false,
        modalType: null,
      };
    default:
      return state;
  }
};

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

const reducers = combineReducers({
  modal,
  foodSearchInput,
});

export default reducers;

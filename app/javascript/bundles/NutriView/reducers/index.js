import { combineReducers } from 'redux';

import {
  OPEN_MODAL,
  CLOSE_MODAL,
  FOOD_SEARCH_REQUEST,
  FOOD_SEARCH_SUCCESS,
  FOOD_SEARCH_FAILURE,
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

const foodSearch = (state = { isFetching: false, response: {} }, action) => {
  switch (action.type) {
    case FOOD_SEARCH_REQUEST:
      return { ...state, isFetching: true };
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
    default:
      return state;
  }
};

const reducers = combineReducers({
  modal,
  foodSearch,
});

export default reducers;

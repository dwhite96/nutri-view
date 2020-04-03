import { combineReducers } from 'redux';

import {
  OPEN_MODAL,
  CLOSE_MODAL,
  DISPLAY_ERROR_MESSAGE,
  FOOD_SEARCH_REQUEST,
  FOOD_SEARCH_SUCCESS,
  FOOD_SEARCH_FAILURE,
  FOOD_REQUEST,
  FOOD_SUCCESS,
  FOOD_FAILURE,
  FOOD_POST_REQUEST,
  FOOD_POST_SUCCESS,
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

// const errorMessage = (state = { error: {} }, action) => {
//   switch (action.type) {
//     case DISPLAY_ERROR_MESSAGE:
//       return {
//         ...state,
//         error: action.error,
//       };
//     default:
//       return state;
//   }
// };

// const foodSearch = (state = { isFetching: false, response: {} }, action) => {
//   switch (action.type) {
//     case FOOD_SEARCH_REQUEST:
//       return { ...state, isFetching: true };
//     case FOOD_SEARCH_SUCCESS:
//       return {
//         ...state,
//         isFetching: false,
//         response: action.data,
//       };
//     case FOOD_SEARCH_FAILURE:
//       return {
//         ...state,
//         isFetching: false,
//         response: action.error,
//       };
//     default:
//       return state;
//   }
// };

const foodRequest = (state = { isFetching: false, response: {} }, action) => {
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
    case FOOD_POST_REQUEST:
      return { ...state, isFetching: true };
    case FOOD_POST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        response: action.data,
      };
    case FOOD_POST_FAILURE:
      console.log(action.error);
      return {
        ...state,
        isFetching: false,
        response: action.error,
      };
    default:
      return state;
  }
};

// const foodPostRequest = (state = { isFetching: false, response: {} }, action) => {
//   switch (action.type) {
//     case FOOD_POST_REQUEST:
//       return { ...state, isFetching: true };
//     case FOOD_POST_SUCCESS:
//       return {
//         ...state,
//         isFetching: false,
//         response: action.data,
//       };
//     case FOOD_POST_FAILURE:
//       return {
//         ...state,
//         isFetching: false,
//         response: action.error,
//       };
//     default:
//       return state;
//   }
// };

const reducers = combineReducers({
  modal,
  // errorMessage,
  // foodSearch,
  foodRequest,
  // foodPostRequest,
});

export default reducers;

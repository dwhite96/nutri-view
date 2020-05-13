import {
  ADD_FOOD_ITEM_REQUEST,
  ADD_FOOD_ITEM_SUCCESS,
  ADD_FOOD_ITEM_FAILURE,
  SAVED_FOOD_ITEMS_FETCH_REQUEST,
  SAVED_FOOD_ITEMS_FETCH_SUCCESS,
  SAVED_FOOD_ITEMS_FETCH_FAILURE,
} from '../constants/nutriViewConstants';

const initialState = {
  isFetching: false,
  byId: {},
  allIds: [],
};

const foodItems = (state = initialState, action) => {
  switch (action.type) {
    case SAVED_FOOD_ITEMS_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case SAVED_FOOD_ITEMS_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        byId: action.response.entities.foodItems,
        allIds: action.response.result,
      };
    case SAVED_FOOD_ITEMS_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    case ADD_FOOD_ITEM_REQUEST:
    case ADD_FOOD_ITEM_SUCCESS:
    case ADD_FOOD_ITEM_FAILURE:
    default:
      return state;
  }
};

export default foodItems;

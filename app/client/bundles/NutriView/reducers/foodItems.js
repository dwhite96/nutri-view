import {
  SAVED_FOOD_ITEMS_FETCH_REQUEST,
  SAVED_FOOD_ITEMS_FETCH_SUCCESS,
  SAVED_FOOD_ITEMS_FETCH_FAILURE,
  SAVE_FOOD_ITEM_TO_MEAL_REQUEST,
  SAVE_FOOD_ITEM_TO_MEAL_SUCCESS,
  SAVE_FOOD_ITEM_TO_MEAL_FAILURE,
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
    case SAVE_FOOD_ITEM_TO_MEAL_REQUEST:
      return {
        ...state,
        isFetching: false,
      };
    case SAVE_FOOD_ITEM_TO_MEAL_SUCCESS:
      return {
        ...state,
        isFetching: false,
        byId: action.response.entities.foodItems,
        allIds: action.response.result,
      };
    case SAVE_FOOD_ITEM_TO_MEAL_FAILURE:
    default:
      return state;
  }
};

export default foodItems;

import {
  SAVE_FOOD_ITEM_TO_MEAL_REQUEST,
  SAVE_FOOD_ITEM_TO_MEAL_SUCCESS,
  SAVE_FOOD_ITEM_TO_MEAL_FAILURE,
} from '../constants/nutriViewConstants';

const initialState = {
  byId: {},
  allIds: [],
};

const mealFoodItems = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_FOOD_ITEM_TO_MEAL_REQUEST:
    case SAVE_FOOD_ITEM_TO_MEAL_SUCCESS:
      return {
        ...state,
        byId: action.response.entities.foodItems,
        allIds: action.response.result,
      };
    case SAVE_FOOD_ITEM_TO_MEAL_FAILURE:
    default:
      return state;
  }
};

export default mealFoodItems;

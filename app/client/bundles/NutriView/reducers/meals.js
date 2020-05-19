import {
  ADD_MEAL_REQUEST,
  ADD_MEAL_SUCCESS,
  ADD_MEAL_FAILURE,
  SAVE_FOOD_ITEM_TO_MEAL_REQUEST,
  SAVE_FOOD_ITEM_TO_MEAL_SUCCESS,
  SAVE_FOOD_ITEM_TO_MEAL_FAILURE,
} from '../constants/nutriViewConstants';

const initialState = {
  isFetching: false,
  byId: {},
  allIds: [],
};

const foodItemsNutritionData = () => {
  const nutrientsData = foodItems.map((foodItem) => {
    const nutrients = foodItem.data.labelNutrients;

    return [
      {
        id: 7,
        value: nutrients.calories.value,
        '% Daily Value': '9%',
      },
      {
        id: 7332242,
        value: nutrients.fat.value,
        '% Daily Value': '9%',
      },
      {
        id: 1,
        value: nutrients.cholesterol.value,
        '% Daily Value': '9%',
      },
      {
        id: 2,
        value: nutrients.sodium.value,
        '% Daily Value': '9%',
      },
      {
        id: 3,
        value: nutrients.carbohydrates.value,
        '% Daily Value': '9%',
      },
      {
        id: 4,
        value: nutrients.sugars.value,
        '% Daily Value': '9%',
      },
      {
        id: 5,
        value: nutrients.protein.value,
        '% Daily Value': '9%',
      },
    ];
  });

  console.log(nutrientsData);
  return nutrientsData[0];
};

const mealCollection = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MEAL_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ADD_MEAL_SUCCESS:
      return {
        ...state,
        meals: [...state.meals, action.response.meal],
        isFetching: false,
      };
    case ADD_MEAL_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    case SAVE_FOOD_ITEM_TO_MEAL_REQUEST:
      return {};
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

export default mealCollection;

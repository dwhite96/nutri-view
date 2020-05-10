import {
  ADD_MEAL_REQUEST,
  ADD_MEAL_SUCCESS,
  ADD_MEAL_FAILURE,
} from '../constants/nutriViewConstants';

const mealCollection = (state = { meals: [], isFetching: false }, action) => {
  switch (action.type) {
    case ADD_MEAL_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ADD_MEAL_SUCCESS:
      return {
        ...state,
        meals: [...state.meals, action.data.meal],
        isFetching: false,
      };
    case ADD_MEAL_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default mealCollection;

/*
Meal State Shape

{
  meals: [
    {
      meal1: {
        id: 1,
        number: 1,
        name: 'breakfast',
        foodItems: [
          {
            foodItemId: 1,
          },
          {
            foodItemId: 1,
          },
        ],
      },
    },
    {
      meal2: {},
    },
  ],
  foodItems: [
    {
      foodItem: {
        id: 1,
        meals: [
          {
            mealId: 1,
          },
          {
            mealId: 1,
          },
        ],
        data: {},
      },
    },
    {
      foodItem: {},
    },
  ],
  mealOrder: {
    meal1: mealId,
    meal2: mealId,
  },
}

****************************************

normalized state shape:

{
  entities: {
    meals: {
      byId: {
        "meal1": {
          id: 1,
          foodItemId: 1,
          number: 1,
          name: 'breakfast',
          foodItems: [],
        },
        "meal2": {},
      },
      allIds: ["meal1", "meal2"],
    },
    foodItems: {
      byId: {
        "foodItem1": {
          id: 1,
          mealId: 1,
          data: {},
        },
        "foodItem2": {},
      },
      allIds: ["foodItem1", "foodItem2"],
    },
    mealFoodItems: {
      byId: {
        1: {
          id: 1,
          mealId: 1,
          foodItemId: 1,
        },
        2: {},
      },
      allIds: [1, 2]
    },
  },
  mealSortOrder: [],
}

*/

/* eslint-disable import/prefer-default-export */
import { schema } from 'normalizr';

const foodItem = new schema.Entity('foodItems');
const foodItemsSchema = [foodItem];

export const Schemas = {
  FOOD_ITEMS: foodItemsSchema,
};

/*

foodItems: Array(2)
0:
created_at: "2020-05-06T05:24:28.814Z"
data: {fdcId: 670382, gtinUpc: "021908476223", dataType: "Branded", foodClass: "Branded", brandOwner: "Small Planet Foods, Inc.", …}
id: 1
updated_at: "2020-05-06T05:24:28.814Z"
1:
created_at: "2020-05-06T05:28:53.619Z"
data: {fdcId: 627490, gtinUpc: "014500015822", dataType: "Branded", foodClass: "Branded", brandOwner: "Pinnacle Foods Group LLC", …}
id: 3
updated_at: "2020-05-06T05:28:53.619Z"

*/

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
        1: {
          id: 1,
          foodItemId: 1,
          number: 1,
          name: 'breakfast',
        },
        2: {},
      },
      allIds: [1, 2],
    },
    foodItems: {
      byId: {
        1: {
          id: 1,
          mealId: 1,
          data: {},
        },
        2: {},
      },
      allIds: [1, 2],
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

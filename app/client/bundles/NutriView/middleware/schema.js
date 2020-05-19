/* eslint-disable import/prefer-default-export */
import { schema } from 'normalizr';

const foodItem = new schema.Entity('foodItems');

const meal = new schema.Entity('meals', {
  foodItems: [foodItem],
});

const mealsSchema = [meal];

const foodItemsSchema = [foodItem];

export const Schemas = {
  MEALS: mealsSchema,
  FOOD_ITEMS: foodItemsSchema,
};

/*

non-normalized meals state shape from Rails:

{
  data: [
    id: 1,
    number: 1,
    food_items: [
      {
        id: 1,
        data: {},
      },
      {
        id: 2,
      },
    ],
  ],
}

****************************************

normalized state shape:

{
  entities: {
    meals: {
      byId: {
        1: {
          id: 1,
          number: 1,
          name: 'breakfast',
          foodItems: [1, 2],
          nutrientsData: {
            byKey: {
              calories: {
                nutrient: 'calories',
                value: 0,
                '% Daily Value': '9%',
              },
              fat: {
                nutrient: 'fat',
                value: 0,
                '% Daily Value': '9%',
              },
              cholesterol: {
                nutrient: 'cholesterol',
                value: 0,
                '% Daily Value': '9%',
              },
              sodium: {
                nutrient: 'sodium',
                value: 0,
                '% Daily Value': '9%',
              },
              carbohydrates: {
                nutrient: 'carbohydrates',
                value: 0,
                '% Daily Value': '9%',
              },
              sugars: {
                nutrient: 'sugars',
                value: 0,
                '% Daily Value': '9%',
              },
              protein: {
                nutrient: 'protein',
                value: 0,
                '% Daily Value': '9%',
              },
            },
            allKeys: [
              'calories',
              'fat',
              'cholesterol',
              'sodium',
              'carbohydrates',
              'sugars',
              'protein',
            ],
          };
        },
        2: {},
      },
      allIds: [1, 2],
    },
    foodItems: {
      byId: {
        1: {
          id: 1,
          data: {},
        },
        2: {},
      },
      allIds: [1, 2],
    },
    mealFoodItems: {
      byId: {
        1: {
          mealId: 1,
          foodItemId: 1,
        },
        2: {},
      },
      allIds: [1, 2],
    },
  },
  mealSortOrder: [],
}

*/

/*

Compute meal foodItems data pseudocode

1. Iterate over meal foodItems array. Try to iterate over these foodItems once.
2. While iterating, grab the foodItems.byId[id].
3. Need 3 pieces of data: foodItem description, foodItem nutrients, foodItem nutrients added together.
4. Add the 3 pieces of data to an object describing/holding this data.


When first going to Meals#index, Rails should return User.Meals and associated FoodItems.
When adding a FoodItem to Meal, Rails should return that FoodItem and Meal.
When deleting a FoodItem, Rails should return a delete success status.

When adding a Meal, Rails should return that new Meal.
When changing a Meal (i.e. the number), Rails should return the updated Meal.
When deleting a Meal, Rails should return delete success status.

*/

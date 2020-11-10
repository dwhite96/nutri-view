/* eslint-disable import/prefer-default-export */
import { normalize, schema } from 'normalizr';
import { camelizeKeys } from 'humps';

// uom = unit of measure
// dailyReferenceValue sourced from U.S. Food and Drug Administration based on the
// reference caloric intake of 2,000 calories for adults
export const baseNutrientsData = () => ({
  nutrientsData: {
    calories: {
      nutrient: 'calories',
      value: 0,
      percentDailyValue: null,
    },
    fat: {
      nutrient: 'fat',
      uom: 'g',
      value: 0,
      percentDailyValue: 0,
      dailyReferenceValue: 78,
    },
    cholesterol: {
      nutrient: 'cholesterol',
      uom: 'mg',
      value: 0,
      percentDailyValue: 0,
      dailyReferenceValue: 300,
    },
    sodium: {
      nutrient: 'sodium',
      uom: 'mg',
      value: 0,
      percentDailyValue: 0,
      dailyReferenceValue: 2300,
    },
    carbohydrates: {
      nutrient: 'carbohydrates',
      uom: 'g',
      value: 0,
      percentDailyValue: 0,
      dailyReferenceValue: 275,
    },
    sugars: {
      nutrient: 'sugars',
      uom: 'g',
      value: 0,
      percentDailyValue: 0,
      dailyReferenceValue: 50,
    },
    protein: {
      nutrient: 'protein',
      uom: 'g',
      value: 0,
      percentDailyValue: 0,
      dailyReferenceValue: 50,
    },
  },
});

const foodItem = new schema.Entity('foodItems');

const meal = new schema.Entity(
  'meals',
  {
    foodItems: [foodItem],
  },
  {
    processStrategy: (entity) => ({
      ...entity,
      ...baseNutrientsData(),
    }),
  },
);

const mealsSchema = [meal];

const foodItemsSchema = [foodItem];

export const Schemas = {
  MEALS: mealsSchema,
  FOOD_ITEMS: foodItemsSchema,
};

export const normalizeData = (data, currentSchema) => {
  const camelizedData = camelizeKeys(data);
  const normalizedData = normalize(camelizedData, currentSchema);

  return normalizedData;
};

export const buildInitialStateObject = (data) => {
  const normalizedData = normalizeData(data, Schemas.MEALS);

  const topLevelObject = {
    meals: {
      byId: normalizedData.entities.meals,
      allIds: normalizedData.result,
    },
    foodItems: {
      byId: normalizedData.entities.foodItems,
    },
    nutrientTypes: [
      'calories',
      'fat',
      'cholesterol',
      'sodium',
      'carbohydrates',
      'sugars',
      'protein',
    ],
    total: baseNutrientsData(),
    dataFetchStatus: 'idle',
  };

  return topLevelObject;
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
            calories: {
              nutrient: 'calories',
              value: 0,
            },
            fat: {
              nutrient: 'fat',
              uom: 'g',
              value: 0,
              percentDailyValue: 0,
              dailyReferenceValue: 78,
            },
            cholesterol: {
              nutrient: 'cholesterol',
              uom: 'mg',
              value: 0,
              percentDailyValue: 0,
              dailyReferenceValue: 300,
            },
            sodium: {
              nutrient: 'sodium',
              uom: 'mg',
              value: 0,
              percentDailyValue: 0,
              dailyReferenceValue: 2300,
            },
            carbohydrates: {
              nutrient: 'carbohydrates',
              uom: 'g',
              value: 0,
              percentDailyValue: 0,
              dailyReferenceValue: 275,
            },
            sugars: {
              nutrient: 'sugars',
              uom: 'g',
              value: 0,
              percentDailyValue: 0,
              dailyReferenceValue: 50,
            },
            protein: {
              nutrient: 'protein',
              uom: 'g',
              value: 0,
              percentDailyValue: 0,
              dailyReferenceValue: 50,
            },
          },
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
    nutrientTypes: [
      'calories',
      'fat',
      'cholesterol',
      'sodium',
      'carbohydrates',
      'sugars',
      'protein',
    ],
    total: {
      nutrientsData: {
        calories: {
          nutrient: 'calories',
          value: 0,
          percentDailyValue: 0,
        },
        fat: {
          nutrient: 'fat',
          value: 0,
          percentDailyValue: 0,
        },
        cholesterol: {
          nutrient: 'cholesterol',
          value: 0,
          percentDailyValue: 0,
        },
        sodium: {
          nutrient: 'sodium',
          value: 0,
          percentDailyValue: 0,
        },
        carbohydrates: {
          nutrient: 'carbohydrates',
          value: 0,
          percentDailyValue: 0,
        },
        sugars: {
          nutrient: 'sugars',
          value: 0,
          percentDailyValue: 0,
        },
        protein: {
          nutrient: 'protein',
          value: 0,
          percentDailyValue: 0,
        },
      },
    },
    dataFetchStatus: 'idle',
    dataFetchResponseMessages: {},
  },
}

*/

/* eslint-disable import/prefer-default-export */
import { normalize } from 'normalizr';
import { camelizeKeys } from 'humps';

const _ = require('lodash');

export const normalizeData = (data, schema) => {
  console.log('before normalized:', data);

  const camelizedData = camelizeKeys(data);
  const normalizedData = normalize(camelizedData, schema);

  console.log('after normalized:', normalizedData);

  return normalizedData;
};

export const baseNutrientsData = () => (
  {
    byKey: {
      calories: {
        nutrient: 'calories',
        value: 0,
        '% Daily Value': '0%',
      },
      fat: {
        nutrient: 'fat',
        value: 0,
        '% Daily Value': '0%',
      },
      cholesterol: {
        nutrient: 'cholesterol',
        value: 0,
        '% Daily Value': '0%',
      },
      sodium: {
        nutrient: 'sodium',
        value: 0,
        '% Daily Value': '0%',
      },
      carbohydrates: {
        nutrient: 'carbohydrates',
        value: 0,
        '% Daily Value': '0%',
      },
      sugars: {
        nutrient: 'sugars',
        value: 0,
        '% Daily Value': '0%',
      },
      protein: {
        nutrient: 'protein',
        value: 0,
        '% Daily Value': '0%',
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
  }
);

export const addFoodItemNutrientsValues = (currentNutrients, newNutrients) => {
  _.mapValues(currentNutrients, (nutrientValues, nutrientKey) => {
    const nutrient = nutrientValues;
    const total = Number(nutrient.value) + Number(newNutrients[nutrientKey].value);
    nutrient.value = total.toFixed(1);
  });
};

export const calculateMealNutrients = (meal, foodItems) => {
  const mealWithNutrients = meal;
  mealWithNutrients.nutrientsData = baseNutrientsData();

  const currentNutrients = mealWithNutrients.nutrientsData.byKey;

  mealWithNutrients.foodItems.forEach((foodItemId) => {
    const foodItem = foodItems.byId[foodItemId];
    const newNutrients = foodItem.data.labelNutrients;

    addFoodItemNutrientsValues(currentNutrients, newNutrients);
  });
};

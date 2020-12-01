/* eslint-disable import/prefer-default-export */
import produce from 'immer';
import {
  mapValues, add, subtract, multiply,
} from 'lodash';

const calcPercentDailyValue = (currentNutrient, nutrientValue) => (
  (nutrientValue / currentNutrient.dailyReferenceValue) * 100
);

export const addEachNutrientValues = (currentNutrients, newNutrients) => (
  mapValues(currentNutrients, (currentNutrient, nutrientKey) => {
    const newNutrientValue = (nutrientKey in newNutrients) ? newNutrients[nutrientKey].value : 0;

    const newNutrientPercentDailyValue = calcPercentDailyValue(currentNutrient, newNutrientValue);

    return produce(currentNutrient, (draft) => {
      draft.value = add(
        Number(currentNutrient.value),
        Number(newNutrientValue),
      ).toFixed(1);

      const newPercentDailyValue = add(
        Number(currentNutrient.percentDailyValue),
        Number(newNutrientPercentDailyValue),
      ).toFixed(0);

      // Need to convert NaN case back to a Number so that short circuit evaluation works correctly
      draft.percentDailyValue = Number(newPercentDailyValue) || null; // Null for no display
    });
  })
);

export const subtractEachNutrientValues = (currentNutrients, oldNutrients) => (
  mapValues(currentNutrients, (currentNutrient, nutrientKey) => {
    const oldNutrientValue = (nutrientKey in oldNutrients) ? oldNutrients[nutrientKey].value : 0;

    const oldNutrientPercentDailyValue = calcPercentDailyValue(currentNutrient, oldNutrientValue);

    return produce(currentNutrient, (draft) => {
      draft.value = subtract(
        Number(currentNutrient.value),
        Number(oldNutrientValue),
      ).toFixed(1);

      const newPercentDailyValue = subtract(
        Number(currentNutrient.percentDailyValue),
        Number(oldNutrientPercentDailyValue),
      ).toFixed(0);

      // Need to convert NaN case back to a Number so that short circuit evaluation works correctly
      draft.percentDailyValue = Number(newPercentDailyValue) || null; // Null for no display
    });
  })
);

export const adjustByServings = (foodItemNutrients, servings) => (
  mapValues(foodItemNutrients, (foodItemNutrient) => (
    produce(foodItemNutrient, (draft) => {
      draft.value = multiply(
        Number(foodItemNutrient.value),
        Number(servings),
      ).toFixed(1);
    })
  ))
);

export const calculateMealNutrients = (meal, mealFoodItems, foodItems) => {
  let newMeal = { ...meal };

  newMeal.mealFoodItems.forEach((mealFoodItemId) => {
    const mealFoodItem = mealFoodItems.byId[mealFoodItemId];

    const foodItemNutrients = foodItems.byId[mealFoodItem.foodItemId].data.labelNutrients;

    const adjustedfoodItemNutrients = adjustByServings(foodItemNutrients, mealFoodItem.servings);

    newMeal = produce(newMeal, (draft) => {
      draft.nutrientsData = addEachNutrientValues(draft.nutrientsData, adjustedfoodItemNutrients);
    });

    return mealFoodItemId;
  });

  return newMeal;
};

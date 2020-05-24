/* eslint-disable prefer-object-spread */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { normalize } from 'normalizr';
import { camelizeKeys } from 'humps';

import api from '../middleware/api';
import { Schemas } from '../middleware/schema';
import reducers from '../reducers/index';

const _ = require('lodash');

const logger = createLogger();

const buildPreloadedState = (railsProps) => {
  const camelizedJson = camelizeKeys(railsProps.data);

  const normalizedJson = Object.assign(
    {}, normalize(camelizedJson, Schemas.MEALS),
  );

  const preloadedState = {
    meals: {
      byId: normalizedJson.entities.meals,
      allIds: normalizedJson.result,
    },
    foodItems: {
      byId: normalizedJson.entities.foodItems,
    },
  };

  const { meals, foodItems } = preloadedState;

  meals.allIds.forEach((mealId) => {
    const meal = meals.byId[mealId];

    meal.nutrientsData = {
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

    const initialNutrientsState = meal.nutrientsData.byKey;

    meal.foodItems.forEach((foodItemId) => {
      const foodItem = foodItems.byId[foodItemId];
      const currentNutrients = foodItem.data.labelNutrients;

      _.mapValues(initialNutrientsState, (nutrientValues, nutrientKey) => {
        const nutrient = nutrientValues;
        const total = Number(nutrient.value) + Number(currentNutrients[nutrientKey].value);
        nutrient.value = total.toFixed(1);
      });
    });
  });

  return preloadedState;
};

const configureStore = (railsProps) => {
  console.log(railsProps);
  const preloadedState = buildPreloadedState(railsProps);
  const newProps = { ...preloadedState };
  console.log('Preloaded State:', newProps);

  return createStore(
    reducers,
    newProps,
    composeWithDevTools(
      applyMiddleware(
        thunk,
        api,
        logger,
      ),
    ),
  );
};

export default configureStore;

/* eslint-disable prefer-object-spread */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import _ from 'lodash';

import api from '../middleware/api';
import { Schemas } from '../middleware/schema';
import reducers from '../reducers/index';
import { normalizeData, calculateMealNutrients, calculateTotal } from '../utilities/nutriViewUtilities';

const logger = createLogger();

const buildPreloadedState = (railsProps) => {
  if (_.isEmpty(railsProps)) {
    return railsProps;
  }

  const normalizedData = normalizeData(railsProps.data, Schemas.MEALS);

  const preloadedState = {
    meals: {
      byId: normalizedData.entities.meals,
      allIds: normalizedData.result,
    },
    foodItems: {
      byId: normalizedData.entities.foodItems,
    },
  };

  const { meals, foodItems } = preloadedState;

  meals.allIds.forEach((mealId) => {
    const meal = meals.byId[mealId];

    calculateMealNutrients(meal, foodItems);
  });

  preloadedState.total = calculateTotal(meals);

  return preloadedState;
};

const configureStore = (railsProps) => {
  console.log(railsProps);
  const preloadedState = buildPreloadedState(railsProps);
  console.log('Preloaded State:', preloadedState);

  return createStore(
    reducers,
    preloadedState,
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

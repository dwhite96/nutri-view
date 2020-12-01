/* eslint-disable prefer-object-spread */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { isEmpty } from 'lodash';

import { buildInitialStateObject } from '../utilities/schemas';
import { calculateMealNutrients, addEachNutrientValues } from '../utilities/nutriViewUtilities';
import reducers from '../reducers/index';
import api from '../middleware/api';

const logger = createLogger();

const buildPreloadedState = (railsProps) => {
  if (isEmpty(railsProps)) {
    return railsProps;
  }

  const preloadedState = buildInitialStateObject(railsProps.data);

  const { meals } = preloadedState;

  meals.allIds.forEach((mealId) => {
    const { mealFoodItems, foodItems } = preloadedState;

    meals.byId[mealId] = calculateMealNutrients(meals.byId[mealId], mealFoodItems, foodItems);

    preloadedState.total.nutrientsData = addEachNutrientValues(
      preloadedState.total.nutrientsData,
      meals.byId[mealId].nutrientsData,
    );

    return mealId;
  });

  return preloadedState;
};

const configureStore = (railsProps) => {
  const preloadedState = buildPreloadedState(railsProps);

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

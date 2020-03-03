/* eslint-disable import/prefer-default-export */

import { CALL_API } from '../middleware/api';

import {
  FOOD_SEARCH_REQUEST,
  FOOD_SEARCH_SUCCESS,
  FOOD_SEARCH_FAILURE,
} from '../constants/nutriViewConstants';

// Call USDA FDC food search API.
const FDCFoodSearch = (foodSearchTerms) => ({
  [CALL_API]: {
    types: [
      FOOD_SEARCH_REQUEST,
      FOOD_SEARCH_SUCCESS,
      FOOD_SEARCH_FAILURE,
    ],
    url: `https://api.nal.usda.gov/fdc/v1/search?api_key=${process.env.FDC_API_KEY}&generalSearchInput=${foodSearchTerms}`,
    method: 'GET',
  },
});

// Food search request thunk.
export const searchFood = (foodSearchTerms) => (dispatch) => (
  dispatch(FDCFoodSearch(foodSearchTerms))
);

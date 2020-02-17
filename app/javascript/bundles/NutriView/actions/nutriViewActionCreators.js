/* eslint-disable import/prefer-default-export */
import { CALL_API } from '../middleware/api';

import {
  DISPLAY_SEARCHED_FOOD_ITEM,
  FOOD_SEARCH_REQUEST,
  FOOD_SEARCH_SUCCESS,
  FOOD_SEARCH_FAILURE
} from '../constants/nutriViewConstants';

export const displaySearchedFoodItem = data => ({
  type: DISPLAY_SEARCHED_FOOD_ITEM,
  data
});

// Call USDA FDC food search API.
const FDCFoodSearch = foodSearchTerms => ({
  [CALL_API]: {
    types: [
      FOOD_SEARCH_REQUEST,
      FOOD_SEARCH_SUCCESS,
      FOOD_SEARCH_FAILURE
    ],
    url: `https://api.nal.usda.gov/fdc/v1/search?api_key=${process.env.FDC_API_KEY}&generalSearchInput=${foodSearchTerms.foodSearch}`,
    method: 'GET'
  }
});

// Food search request thunk.
export const foodSearchRequest = foodSearchTerms => dispatch => {
  return dispatch(FDCFoodSearch(foodSearchTerms))
  .then(response => {
    console.log(response);
    if (response.type === FOOD_SEARCH_SUCCESS) {
      dispatch(displaySearchedFoodItem(response.data));
    }
  });
};

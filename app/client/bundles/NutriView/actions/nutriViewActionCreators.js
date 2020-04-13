/* eslint-disable import/prefer-default-export */
import ReactOnRails from 'react-on-rails';

import { CALL_API } from '../middleware/api';

import {
  OPEN_MODAL,
  CLOSE_MODAL,
  FOOD_REQUEST,
  FOOD_SUCCESS,
  FOOD_FAILURE,
  FOOD_POST_FAILURE,
} from '../constants/nutriViewConstants';

const FDCRootURL = 'https://api.nal.usda.gov/fdc/v1';

export const openModal = (modalType) => ({
  type: OPEN_MODAL,
  modalType,
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});

// Call USDA FDC food search API
const FDCFoodSearch = (foodSearchTerms) => ({
  [CALL_API]: {
    types: [
      FOOD_REQUEST,
      FOOD_SUCCESS,
      FOOD_FAILURE,
    ],
    url: `${FDCRootURL}/foods/search?api_key=${process.env.FDC_API_KEY}&query=${foodSearchTerms}`,
    request: {
      method: 'GET',
    },
  },
});

// Food search request thunk
export const searchFood = (foodSearchTerms) => (dispatch) => (
  dispatch(FDCFoodSearch(foodSearchTerms))
);

// Call USDA FDC food fetch API
const FDCFoodFetch = (foodFDCID) => ({
  [CALL_API]: {
    types: [
      FOOD_REQUEST,
      FOOD_SUCCESS,
      FOOD_FAILURE,
    ],
    url: `${FDCRootURL}/food/${foodFDCID}?api_key=${process.env.FDC_API_KEY}`,
    request: {
      method: 'GET',
    },
  },
});

// Save food JSON data to Nutri-View app database
const saveFoodToDatabase = (data) => ({
  [CALL_API]: {
    types: [
      FOOD_REQUEST,
      FOOD_SUCCESS,
      FOOD_POST_FAILURE,
    ],
    url: 'http://localhost:3000/food_items',
    request: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-CSRF-Token': ReactOnRails.authenticityToken(),
      },
      body: JSON.stringify(data),
    },
  },
});

// Save food thunk
export const saveFood = (foodFDCID) => (dispatch) => (
  dispatch(FDCFoodFetch(foodFDCID))
    .then(
      (response) => {
        const data = { data: response.data };
        dispatch(saveFoodToDatabase(data));
      },
    )
);

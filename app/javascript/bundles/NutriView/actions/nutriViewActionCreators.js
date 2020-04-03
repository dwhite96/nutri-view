/* eslint-disable import/prefer-default-export */
import ReactOnRails from 'react-on-rails';

import { CALL_API } from '../middleware/api';

import {
  OPEN_MODAL,
  CLOSE_MODAL,
  DISPLAY_ERROR_MESSAGE,
  FOOD_SEARCH_REQUEST,
  FOOD_SEARCH_SUCCESS,
  FOOD_SEARCH_FAILURE,
  FOOD_REQUEST,
  FOOD_SUCCESS,
  FOOD_FAILURE,
  FOOD_POST_REQUEST,
  FOOD_POST_SUCCESS,
  FOOD_POST_FAILURE,
} from '../constants/nutriViewConstants';

export const openModal = (modalType) => ({
  type: OPEN_MODAL,
  modalType,
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});

export const errorMessage = (error) => ({
  type: DISPLAY_ERROR_MESSAGE,
  error,
});

// Error message thunk
export const displayErrorMessage = (error) => (dispatch) => {
  dispatch(openModal('ERROR_MESSAGE_VIEW'));
  dispatch(errorMessage(error));
};

// Call USDA FDC food search API
const FDCFoodSearch = (foodSearchTerms) => ({
  [CALL_API]: {
    types: [
      FOOD_SEARCH_REQUEST,
      FOOD_SEARCH_SUCCESS,
      FOOD_SEARCH_FAILURE,
    ],
    url: `https://api.nal.usda.gov/fdc/v1/search?api_key=${process.env.FDC_API_KEY}&generalSearchInput=${foodSearchTerms}`,
    request: {
      method: 'GET',
    },
  },
});

// Food search request thunk
export const searchFood = (foodSearchTerms) => (dispatch) => (
  dispatch(FDCFoodSearch(foodSearchTerms))
);

// Call USDA FDC food request API
const FDCFoodRequest = (foodFDCID) => ({
  [CALL_API]: {
    types: [
      FOOD_REQUEST,
      FOOD_SUCCESS,
      FOOD_FAILURE,
    ],
    url: `https://api.nal.usda.gov/fdc/v1/${foodFDCID}?api_key=${process.env.FDC_API_KEY}`,
    request: {
      method: 'GET',
    },
  },
});

const saveFoodToDatabase = (data) => ({
  [CALL_API]: {
    types: [
      FOOD_POST_REQUEST,
      FOOD_POST_SUCCESS,
      FOOD_POST_FAILURE,
    ],
    url: 'http://localhost:3000/food_items',
    request: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': ReactOnRails.authenticityToken(),
      },
      body: data,
    },
  },
});

// Save food thunk
export const saveFood = (foodFDCID) => (dispatch) => (
  dispatch(FDCFoodRequest(foodFDCID))
    .then(
      (response) => dispatch(saveFoodToDatabase(response.data)),
    )
);

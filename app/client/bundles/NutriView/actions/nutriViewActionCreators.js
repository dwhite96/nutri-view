/* eslint-disable import/prefer-default-export */
import ReactOnRails from 'react-on-rails';

import { CALL_API } from '../middleware/api';
import {
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  FOOD_SEARCH_REQUEST,
  FOOD_SEARCH_SUCCESS,
  FOOD_SEARCH_FAILURE,
  FOOD_FETCH_REQUEST,
  FOOD_FETCH_SUCCESS,
  FOOD_FETCH_FAILURE,
  SAVE_FOOD_REQUEST,
  SAVE_FOOD_SUCCESS,
  SAVE_FOOD_FAILURE,
  UPDATE_TOTAL,
} from '../constants/nutriViewConstants';

const FDCRootURL = 'https://api.nal.usda.gov/fdc/v1';

// Rails backend Devise user registration request
const registrationRequested = (registrationData) => ({
  [CALL_API]: {
    types: [
      REGISTRATION_REQUEST,
      REGISTRATION_SUCCESS,
      REGISTRATION_FAILURE,
    ],
    url: 'http://localhost:3000/users.json',
    request: {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-CSRF-Token': ReactOnRails.authenticityToken(),
      },
      body: JSON.stringify({
        authenticity_token: ReactOnRails.authenticityToken(),
        user: registrationData,
      }),
    },
  },
});

// Registration request thunk
export const registrationFormSubmitted = (registrationData) => (dispatch) => {
  dispatch(registrationRequested(registrationData))
    .then(() => {
      window.location = '/'; // Redirect to root after registration - successful or not
    });
};

// Rails backend Devise user login request
const loginRequested = (loginData) => ({
  [CALL_API]: {
    types: [
      LOGIN_REQUEST,
      LOGIN_SUCCESS,
      LOGIN_FAILURE,
    ],
    url: 'http://localhost:3000/users/sign_in.json',
    request: {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-CSRF-Token': ReactOnRails.authenticityToken(),
      },
      body: JSON.stringify({
        authenticity_token: ReactOnRails.authenticityToken(),
        user: loginData,
      }),
    },
  },
});

// Login request thunk
export const loginFormSubmitted = (loginData) => (dispatch) => {
  dispatch(loginRequested(loginData))
    .then(() => {
      window.location = '/'; // Redirect to root after login attempt - successful or not
    });
};

// Rails backend Devise user logout request
const logoutRequested = () => ({
  [CALL_API]: {
    types: [
      LOGOUT_REQUEST,
      LOGOUT_SUCCESS,
      LOGOUT_FAILURE,
    ],
    url: 'http://localhost:3000/users/sign_out',
    request: {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'X-CSRF-Token': ReactOnRails.authenticityToken(),
      },
    },
  },
});

// Logout request thunk
export const logoutClicked = () => (dispatch) => {
  dispatch(logoutRequested())
    .then(() => {
      window.location = '/'; // Redirect to root after logout attempt - successful or not
    });
};

// Call USDA FDC food search API
const FDCFoodSearch = (foodSearchTerms) => ({
  [CALL_API]: {
    types: [
      FOOD_SEARCH_REQUEST,
      FOOD_SEARCH_SUCCESS,
      FOOD_SEARCH_FAILURE,
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
      FOOD_FETCH_REQUEST,
      FOOD_FETCH_SUCCESS,
      FOOD_FETCH_FAILURE,
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
      SAVE_FOOD_REQUEST,
      SAVE_FOOD_SUCCESS,
      SAVE_FOOD_FAILURE,
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

// Save food to Rails database thunk
export const saveFood = (foodFDCID) => (dispatch) => (
  dispatch(FDCFoodFetch(foodFDCID))
    .then(
      (response) => {
        const data = { data: response.data };
        dispatch(saveFoodToDatabase(data));
      },
    )
);

// Update nutrients value totals for all meals on display
export const updateTotal = (meals) => ({
  type: UPDATE_TOTAL,
  meals,
});

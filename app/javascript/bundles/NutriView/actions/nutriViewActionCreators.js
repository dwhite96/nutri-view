/* eslint-disable import/prefer-default-export */

import { DISPLAY_FOOD_ITEM } from '../constants/nutriViewConstants';

export const displayFoodItem = (text) => ({
  type: DISPLAY_FOOD_ITEM,
  text,
});

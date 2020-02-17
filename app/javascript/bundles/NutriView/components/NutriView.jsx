import React from 'react';
import PropTypes from 'prop-types';

import FoodSearchInput from '../containers/FoodSearchInputContainer';

const NutriView = ({ data }) => (
  <div>
    <h3>Food Items Component</h3>
    <FoodSearchInput />
  </div>
);

// NutriView.propTypes = {
//   data: PropTypes.string.isRequired
// };

export default NutriView;

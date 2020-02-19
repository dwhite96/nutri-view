import React from 'react';
import PropTypes from 'prop-types';

import FoodSearchInput from '../containers/FoodSearchInputContainer';

const App = () => (
  <div>
    <h3>Food Search Component</h3>
    <FoodSearchInput />
  </div>
);

// App.propTypes = {
//   data: PropTypes.string.isRequired
// };

export default App;

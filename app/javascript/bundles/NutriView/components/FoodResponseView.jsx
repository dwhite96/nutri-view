import React from 'react';
import PropTypes from 'prop-types';

const FoodResponseView = ({ response }) => {
  // FDC foods array exists and has at least one food item
  if (Array.isArray(response.foods) && response.foods.length > 0) {
    return (
      <div>
        <ul>
          {
            response.foods.map((food) => (
              <li key={food.fdcId}>
                <div>
                  <p>
                    <strong>Food Description: </strong>
                    {food.description}
                  </p>
                  <p>
                    <strong>Made by: </strong>
                    {food.brandOwner}
                  </p>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }

  // FDC foods array exists and has no food items
  if (Array.isArray(response.foods) && response.foods.length === 0) {
    return (
      <div>
        <p>No food in response</p>
      </div>
    );
  }

  if (response.error) {
    return (
      <div>
        <p>
          {response.error.code}
        </p>
      </div>
    );
  }

  return null;
};

FoodResponseView.propTypes = {
  response: PropTypes.shape({
    foods: PropTypes.Array,
    error: PropTypes.Object,
  }).isRequired,
};

export default FoodResponseView;

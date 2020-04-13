import React from 'react';
import PropTypes from 'prop-types';

const FoodItemsList = ({ foodItems }) => (
  <div>
    <ul>
      {
        foodItems.map((food) => (
          <li key={food.data.fdcId}>
            <div>
              <p>
                <strong>Food Description: </strong>
                {food.data.description}
              </p>
              <p>
                <strong>Made by: </strong>
                {food.data.brandOwner}
              </p>
            </div>
          </li>
        ))
      }
    </ul>
  </div>
);

FoodItemsList.propTypes = {
  foodItems: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FoodItemsList;

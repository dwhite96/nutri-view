import React from 'react';
import PropTypes from 'prop-types';
import { multiply } from 'lodash';
import {
  Dropdown, Button, Empty, Menu, Popover,
} from 'antd';
import { DownOutlined } from '@ant-design/icons';

const MealItems = ({
  mealId,
  foodItems,
  mealFoodItems,
  removeFoodItemFromMeal,
}) => {
  const handleClick = ({ key }, foodItem) => {
    switch (key) {
      case 'Remove from meal':
        return removeFoodItemFromMeal(foodItem, mealId);
      case 'Move to another meal':
      default:
        return null;
    }
  };

  if (Array.isArray(mealFoodItems) && mealFoodItems.length > 0) {
    return mealFoodItems.map((mealFoodItem) => {
      const foodItem = foodItems.byId[mealFoodItem.foodItemId];

      const {
        householdServingFullText,
        servingSize,
        servingSizeUnit,
        labelNutrients,
        description,
      } = foodItem.data;

      const menu = (
        <Menu onClick={(e) => handleClick(e, foodItem)}>
          <Menu.Item key="Remove from meal">
            Remove from meal
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="Move to another meal">
            Move to another meal
          </Menu.Item>
        </Menu>
      );

      const content = (
        <div>
          <p>
            {`Serving size: ${householdServingFullText} (${servingSize}${servingSizeUnit})`}
          </p>
          <p>
            {`Calories per serving: ${labelNutrients.calories.value}`}
          </p>
          <p>
            {`Servings used: ${mealFoodItem.servings}`}
          </p>
          <p>
            {`Calories: ${multiply(
              labelNutrients.calories.value,
              Number(mealFoodItem.servings),
            ).toFixed(1)}`}
          </p>
        </div>
      );

      return (
        <li key={foodItem.id} style={{ marginBottom: 10 }}>
          <Dropdown overlay={menu} trigger={['click']}>
            <Button
              type="link"
              size="small"
              block="true"
              style={{
                whiteSpace: 'normal',
                textAlign: 'left',
                border: 'none',
                padding: 0,
              }}
            >
              <Popover
                title="Servings Info"
                content={content}
              >
                <span style={{ fontSize: '0.7em' }}>
                  {description}
                  &nbsp;
                  <DownOutlined />
                </span>
              </Popover>
            </Button>
          </Dropdown>
        </li>
      );
    });
  }

  return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
};

MealItems.propTypes = {
  mealId: PropTypes.number.isRequired,
  foodItems: PropTypes.shape({
    byId: PropTypes.objectOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      data: PropTypes.shape({
        description: PropTypes.string.isRequired,
        householdServingFullText: PropTypes.string,
        servingSize: PropTypes.number,
        servingSizeUnit: PropTypes.string,
        labelNutrients: PropTypes.shape({
          calories: PropTypes.shape({
            value: PropTypes.number.isRequired,
          }).isRequired,
        }).isRequired,
      }).isRequired,
    })).isRequired,
  }).isRequired,
  mealFoodItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    servings: PropTypes.string.isRequired,
  })).isRequired,
  removeFoodItemFromMeal: PropTypes.func.isRequired,
};

export default MealItems;

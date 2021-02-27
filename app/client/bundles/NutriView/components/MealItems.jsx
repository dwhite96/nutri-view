import React from 'react';
import PropTypes from 'prop-types';
import {
  Dropdown, Button, Empty, Menu,
} from 'antd';
import { DownOutlined } from '@ant-design/icons';

const MealItems = ({ mealId, foodItems, removeFoodItemFromMeal }) => {
  const handleClick = ({ key }, foodItem) => {
    switch (key) {
      case 'Remove from meal':
        return removeFoodItemFromMeal(foodItem, mealId);
      case 'Move to another meal':
      default:
        return null;
    }
  };

  if (Array.isArray(foodItems) && foodItems.length > 0) {
    return foodItems.map((foodItem) => {
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
              <span style={{ fontSize: '0.7em' }}>
                {foodItem.data.description}
                &nbsp;
                <DownOutlined />
              </span>
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
  foodItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    data: PropTypes.shape({
      description: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
  removeFoodItemFromMeal: PropTypes.func.isRequired,
};

export default MealItems;

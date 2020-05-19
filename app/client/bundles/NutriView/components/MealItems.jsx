import React from 'react';
import PropTypes from 'prop-types';
import {
  Dropdown, Button, Empty, Menu,
} from 'antd';
import {
  DownOutlined,
} from '@ant-design/icons';

const menu = (
  <Menu>
    <Menu.Item key="0">
      Remove from meal
    </Menu.Item>
    <Menu.Item key="1">
      Move to another meal
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="2">3rd menu item</Menu.Item>
  </Menu>
);

const MealItems = ({ foodItems }) => {
  if (Array.isArray(foodItems) && foodItems.length > 0) {
    return foodItems.map((foodItem) => (
      <li key={foodItem.id}>
        <Dropdown overlay={menu} trigger={['click']}>
          <Button
            type="link"
            size="small"
            block="true"
            style={{
              whiteSpace: 'normal',
              border: 'none',
              height: 44,
              padding: 0,
            }}
          >
            <span>
              <span>{foodItem.data.description}</span>
              &nbsp;
              <DownOutlined />
            </span>
          </Button>
        </Dropdown>
      </li>
    ));
  }

  return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
};

MealItems.propTypes = {
  foodItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    data: PropTypes.shape({
      description: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
};

export default MealItems;

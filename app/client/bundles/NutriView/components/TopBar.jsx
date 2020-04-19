import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Layout, Menu, Button, message, Typography,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import FoodSearchInputModal from './FoodSearchInputModal';

const { Header } = Layout;
const { Title } = Typography;

const TopBar = ({
  isFetching, response, searchFood, saveFood,
}) => {
  const [visible, setVisible] = useState(false);

  const onSave = (selectedFood) => {
    console.log('Received values of form: ', selectedFood);

    saveFood(selectedFood)
      .then((res) => {
        setVisible(false);
      })
      .catch((info) => {
        console.log(':', info);
      });
  };

  return (
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="1">
          <a
            data-remote="true"
            rel="nofollow"
            href="/"
          >
            <Title level={3}>NutriView</Title>
          </a>
        </Menu.Item>
        <Menu.Item key="2" selectable={false}>
          <div>
            <Button
              icon={<SearchOutlined />}
              onClick={() => {
                setVisible(true);
              }}
            >
              Search Food
            </Button>
            <FoodSearchInputModal
              visible={visible}
              onSave={onSave}
              onCancel={() => {
                setVisible(false);
              }}
              isFetching={isFetching}
              response={response}
              searchFood={searchFood}
            />
          </div>
        </Menu.Item>
        {/*
          if user_signed_in? conditional would go here, then logout link
        */}
        <Menu.Item key="3">Sign up</Menu.Item>
        <Menu.Item key="4">Login</Menu.Item>
      </Menu>
    </Header>
  );
};

TopBar.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  response: PropTypes.shape({
    message: PropTypes.string,
  }).isRequired,
  searchFood: PropTypes.func.isRequired,
  saveFood: PropTypes.func.isRequired,
};

export default TopBar;

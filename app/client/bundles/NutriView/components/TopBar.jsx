import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Layout, Row, Col, Menu, Button, message, Typography,
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
      .then(() => {
        setVisible(false);
      })
      .catch((info) => {
        console.log(':', info);
      });
  };

  return (
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <Row align="middle">
        <Col span={3}>
          <div>
            <a
              data-remote="true"
              rel="nofollow"
              href="/"
            >
              <Title level={3} style={{ marginBottom: 0 }}>
                NutriView
              </Title>
            </a>
          </div>
        </Col>
        <Col span={9}>
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
        </Col>
        <Col span={4} offset={8}>
          <Menu theme="dark" mode="horizontal">
            {/*
              if user_signed_in? conditional would go here, then logout link
            */}
            <Menu.Item key="1">Sign up</Menu.Item>
            <Menu.Item key="2">Login</Menu.Item>
          </Menu>
        </Col>
      </Row>
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

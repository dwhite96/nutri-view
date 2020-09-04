import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Layout, Row, Col, Menu, Button, Typography,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import FoodSearchInputModal from './FoodSearchInputModal';

const { Header } = Layout;
const { Title } = Typography;

const TopBar = ({
  isFetching, response, searchFood, saveFood, logout,
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

  const handleClick = (e) => {
    console.log(e);

    switch (e.key) {
      case 'profile': updateProfile(); break;
      case 'logout': logout(); break;
      default: console.log('Menu item key not found');
    }
  };

  return (
    <div>
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
          <Col span={7}>
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
          <Col span={6} offset={8}>
            <Menu onClick={handleClick} theme="dark" mode="horizontal">
              <Menu.Item key="profile">Update Profile</Menu.Item>
              <Menu.Item key="logout">Logout</Menu.Item>
            </Menu>
          </Col>
        </Row>
      </Header>
    </div>
  );
};

TopBar.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  response: PropTypes.shape({
    message: PropTypes.string,
  }).isRequired,
  searchFood: PropTypes.func.isRequired,
  saveFood: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

export default TopBar;

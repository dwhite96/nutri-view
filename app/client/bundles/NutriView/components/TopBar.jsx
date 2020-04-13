import React from 'react';
import {
  Layout, Menu, Button, Typography,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import Modal from '../containers/Modal';
import { openModal } from '../actions/nutriViewActionCreators';

const { Header } = Layout;
const { Title } = Typography;

const TopBar = ({ dispatch }) => (
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
      <Menu.Item key="2">
        <Button
          icon={<SearchOutlined />}
          onClick={() => dispatch(openModal('FOOD_SEARCH_INPUT'))}
        >
          Search Food
        </Button>
        <Modal />
      </Menu.Item>
      {/*
        if user_signed_in? conditional would go here, then logout link
      */}
      <Menu.Item key="3">Sign up</Menu.Item>
      <Menu.Item key="4">Login</Menu.Item>
    </Menu>
  </Header>
);

export default TopBar;

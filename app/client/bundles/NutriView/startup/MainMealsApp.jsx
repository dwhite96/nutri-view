import React from 'react';
import { Provider } from 'react-redux';
import ReactOnRails from 'react-on-rails';
import { Layout } from 'antd';

import MainMealsView from '../components/MainMealsView';

const { Content } = Layout;

const MainMealsApp = () => {
  const store = ReactOnRails.getStore('configureStore');

  return (
    <Provider store={store}>
      <Layout>
        <Content>
          <MainMealsView />
        </Content>
      </Layout>
    </Provider>
  );
};

export default MainMealsApp;

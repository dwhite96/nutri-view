import React from 'react';
import { Provider } from 'react-redux';
import ReactOnRails from 'react-on-rails';
import { Layout } from 'antd';

import MainMealsViewContainer from '../containers/MainMealsViewContainer';

const { Content } = Layout;

const MainMealsApp = () => {
  const store = ReactOnRails.getStore('configureStore');

  return (
    <Provider store={store}>
      <Layout>
        <Content>
          <MainMealsViewContainer />
        </Content>
      </Layout>
    </Provider>
  );
};

export default MainMealsApp;

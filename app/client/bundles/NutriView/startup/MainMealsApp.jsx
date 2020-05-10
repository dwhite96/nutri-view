import React from 'react';
import { Provider } from 'react-redux';
import ReactOnRails from 'react-on-rails';
import { Layout } from 'antd';

import MealsContainer from '../containers/MealsContainer';

const { Content } = Layout;

const MainMealsApp = () => {
  const store = ReactOnRails.getStore('configureStore');

  return (
    <Provider store={store}>
      <Layout>
        <Content>
          <MealsContainer />
        </Content>
      </Layout>
    </Provider>
  );
};

export default MainMealsApp;

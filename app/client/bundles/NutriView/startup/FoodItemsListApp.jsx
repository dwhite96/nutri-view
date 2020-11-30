import React from 'react';
import { Provider } from 'react-redux';
import ReactOnRails from 'react-on-rails';
import { Layout } from 'antd';

// import FoodItemsList from '../containers/FoodItemsListContainer';

const { Content } = Layout;

const FoodItemsListApp = () => {
  const store = ReactOnRails.getStore('configureStore');

  return (
    <Provider store={store}>
      <Layout>
        <Content>
          <FoodItemsList />
        </Content>
      </Layout>
    </Provider>
  );
};

export default FoodItemsListApp;

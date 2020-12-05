import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Spin } from 'antd';

import FoodResponseView from './FoodResponseView';

const { Search } = Input;

const FDCFoodSearch = ({
  form,
  response,
  dataFetchStatus,
  setSelectedFood,
  searchFood,
}) => (
  <div>
    <Form
      form={form}
      name="FDC_food_search_form"
    >
      <Form.Item
        rules={[
          {
            required: true,
            message: 'Required',
          },
        ]}
      >
        <Search
          placeholder="Enter food search terms or UPC..."
          enterButton="Search"
          size="large"
          onSearch={(value) => searchFood(value)}
          autoFocus
        />
      </Form.Item>

      <Spin key="1" spinning={dataFetchStatus === 'loading'}>
        <FoodResponseView response={response} setSelectedFood={setSelectedFood} />
      </Spin>
    </Form>
  </div>
);

FDCFoodSearch.propTypes = {
  form: PropTypes.shape({}).isRequired,
  response: PropTypes.shape({}).isRequired,
  dataFetchStatus: PropTypes.string.isRequired,
  setSelectedFood: PropTypes.func.isRequired,
  searchFood: PropTypes.func.isRequired,
};

export default FDCFoodSearch;

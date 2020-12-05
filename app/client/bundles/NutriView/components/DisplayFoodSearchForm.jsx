import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

import FoodItemsList from './FoodItemsList';

const { Search } = Input;

const DisplayFoodSearchForm = ({
  form,
  foodSearchList,
  mealFoodItemIds,
  setSelectedFood,
  changeModalForm,
  nutriViewDatabaseSearch,
}) => (
  <div>
    <Form
      form={form}
      name="rails_food_search_form"
      preserve={false}
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
          onSearch={(value) => nutriViewDatabaseSearch(value)}
          autoFocus
        />
      </Form.Item>
    </Form>
    <FoodItemsList
      foodSearchList={foodSearchList}
      mealFoodItemIds={mealFoodItemIds}
      setSelectedFood={setSelectedFood}
      changeModalForm={changeModalForm}
    />
  </div>
);

DisplayFoodSearchForm.propTypes = {
  form: PropTypes.shape({}).isRequired,
  foodSearchList: PropTypes.arrayOf(PropTypes.object).isRequired,
  mealFoodItemIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  setSelectedFood: PropTypes.func.isRequired,
  changeModalForm: PropTypes.func.isRequired,
  nutriViewDatabaseSearch: PropTypes.func.isRequired,
};

export default DisplayFoodSearchForm;

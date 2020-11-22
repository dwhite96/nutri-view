import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input } from 'antd';

// import FoodResponseView from './FoodResponseView';
import FoodItemsListContainer from '../containers/FoodItemsListContainer';

const { Search } = Input;

const AddFoodItemModal = ({
  visible,
  onSave,
  onCancel,
  nutriViewDatabaseSearch,
}) => {
  const [selectedFood, setSelectedFood] = useState(0);
  const [form] = Form.useForm();

  return (
    <Modal
      title="Add food item to meal"
      visible={visible}
      okText="Save"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        onSave(selectedFood);
      }}
    >
      <Form
        form={form}
        name="form_in_modal"
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
      {/* <FoodResponseView response={response} setSelectedFood={setSelectedFood} /> */}
      <FoodItemsListContainer setSelectedFood={setSelectedFood} />
    </Modal>
  );
};

AddFoodItemModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  nutriViewDatabaseSearch: PropTypes.func.isRequired,
};

export default AddFoodItemModal;

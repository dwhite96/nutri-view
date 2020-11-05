import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input } from 'antd';

import FoodResponseView from './FoodResponseView';

const { Search } = Input;

const FoodSearchInputModal = ({
  visible,
  onSave,
  onCancel,
  response,
  searchFood,
}) => {
  const [selectedFood, setSelectedFood] = useState(0);
  const [form] = Form.useForm();

  return (
    <Modal
      title="Food Search"
      visible={visible}
      okText="Save"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form.resetFields();
        onSave(selectedFood);
      }}
      destroyOnClose="true"
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
            onSearch={(value) => searchFood(value)}
          />
        </Form.Item>
      </Form>
      <FoodResponseView response={response} setSelectedFood={setSelectedFood} />
    </Modal>
  );
};

FoodSearchInputModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  response: PropTypes.shape({}).isRequired,
  searchFood: PropTypes.func.isRequired,
};

export default FoodSearchInputModal;

import React from 'react';
import PropTypes from 'prop-types';
import {
  Form, Slider, Descriptions, Space, Divider,
} from 'antd';

const DisplayFoodDataForm = ({ form, foodData }) => {
  const servingSize = `${foodData.householdServingFullText} (${foodData.servingSize + foodData.servingSizeUnit})`;

  return (
    <Space direction="vertical" size="middle">
      <Descriptions title="Food Info" layout="vertical" size="small">
        <Descriptions.Item label="Brand">{foodData.brandOwner}</Descriptions.Item>
        <Descriptions.Item label="Description">{foodData.description}</Descriptions.Item>
        <Descriptions.Item label="Serving Size">{servingSize}</Descriptions.Item>
      </Descriptions>
      <Divider />
      <Form
        layout="horizontal"
        form={form}
        name="form_in_modal"
        initialValues={{
          servings: 1,
        }}
      >
        <Form.Item name="servings" label="Serving Selection">
          <Slider
            marks={{
              0.25: '1/4',
              1.00: '1',
              2.00: '2',
              3.00: '3',
            }}
            step={0.25}
            min={0.25}
            max={3.00}
          />
        </Form.Item>
      </Form>
    </Space>
  );
};

DisplayFoodDataForm.propTypes = {
  form: PropTypes.shape({}).isRequired,
  foodData: PropTypes.shape({
    brandOwner: PropTypes.string,
    description: PropTypes.string,
    householdServingFullText: PropTypes.string,
    servingSize: PropTypes.number,
    servingSizeUnit: PropTypes.string,
  }).isRequired,
};

export default DisplayFoodDataForm;

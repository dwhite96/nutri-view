import React from 'react';
import PropTypes from 'prop-types';
import {
  Form, Row, Col, Input, InputNumber, Tooltip, Typography,
} from 'antd';

const { Title } = Typography;

const initialValues = {
  labelNutrients: {
    calories: {
      value: 0,
    },
    fat: {
      value: 0,
    },
    cholesterol: {
      value: 0,
    },
    sodium: {
      value: 0,
    },
    carbohydrates: {
      value: 0,
    },
    sugars: {
      value: 0,
    },
    protein: {
      value: 0,
    },
  },
};

const ManualFoodEntryForm = ({ form }) => (
  <Form
    form={form}
    name="manual_food_entry"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    initialValues={initialValues}
  >
    <Row gutter={24}>
      <Col span={12}>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: 'Please input description using alpha characters!',
              pattern: /[a-zA-Z,;:()&!]/,
            },
          ]}
        >
          <Input maxLength={100} autoFocus />
        </Form.Item>

        <Form.Item
          label="Brand Owner"
          name="brandOwner"
        >
          <Input maxLength={100} />
        </Form.Item>

        <Form.Item
          label="UPC"
          name="gtinUpc"
          rules={[
            {
              required: false,
              message: 'Please input UPC (bar code #) using only 12 digits!',
              len: 12,
              min: 12,
              max: 12,
              pattern: /\d/,
            },
          ]}
        >
          <Input maxLength={12} />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          label="Serving Size Text"
          name="householdServingFullText"
          tooltip={<Tooltip title='"1 bar", "1 cup" etc.' />}
          rules={[
            {
              required: true,
              message: 'Please input serving size text!',
            },
          ]}
        >
          <Input maxLength={20} />
        </Form.Item>

        <Form.Item
          label="Serving Size"
          name="servingSize"
          rules={[
            {
              required: true,
              message: 'Please input serving size!',
            },
          ]}
        >
          <InputNumber size="small" min={0} max={10000} step={1} />
        </Form.Item>

        <Form.Item
          label="Serving Size Unit"
          name="servingSizeUnit"
          rules={[
            {
              required: true,
              message: 'Please input serving size unit!',
            },
          ]}
        >
          <Input maxLength={5} />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={24}>
      <Col span={12}>
        <Title level={5}>Macronutrients</Title>

        <Form.Item
          label="Calories"
          name={['labelNutrients', 'calories', 'value']}
          rules={[
            {
              required: true,
              message: 'Required',
            },
          ]}
        >
          <InputNumber size="small" min={0} max={1000} step={0.1} />
        </Form.Item>

        <Form.Item
          label="Total Fat"
          name={['labelNutrients', 'fat', 'value']}
          rules={[
            {
              required: true,
              message: 'Required',
            },
          ]}
        >
          <InputNumber size="small" min={0} max={1000} step={0.1} />
        </Form.Item>

        <Form.Item
          label="Saturated Fat"
          name={['labelNutrients', 'saturatedFat', 'value']}
        >
          <InputNumber size="small" min={0} max={1000} step={0.1} />
        </Form.Item>

        <Form.Item
          label="Trans Fat"
          name={['labelNutrients', 'transFat', 'value']}
        >
          <InputNumber size="small" min={0} max={1000} step={0.1} />
        </Form.Item>

        <Form.Item
          label="Cholesterol"
          name={['labelNutrients', 'cholesterol', 'value']}
          rules={[
            {
              required: true,
              message: 'Required',
            },
          ]}
        >
          <InputNumber size="small" min={0} max={1000} step={0.1} />
        </Form.Item>

        <Form.Item
          label="Sodium"
          name={['labelNutrients', 'sodium', 'value']}
          rules={[
            {
              required: true,
              message: 'Required',
            },
          ]}
        >
          <InputNumber size="small" min={0} max={1000} step={0.1} />
        </Form.Item>

        <Form.Item
          label="Total Carbohydrates"
          name={['labelNutrients', 'carbohydrates', 'value']}
          rules={[
            {
              required: true,
              message: 'Required',
            },
          ]}
        >
          <InputNumber size="small" min={0} max={1000} step={0.1} />
        </Form.Item>

        <Form.Item
          label="Dietary Fiber"
          name={['labelNutrients', 'fiber', 'value']}
        >
          <InputNumber size="small" min={0} max={1000} step={0.1} />
        </Form.Item>

        <Form.Item
          label="Total Sugars"
          name={['labelNutrients', 'sugars', 'value']}
          rules={[
            {
              required: true,
              message: 'Required',
            },
          ]}
        >
          <InputNumber size="small" min={0} max={1000} step={0.1} />
        </Form.Item>

        <Form.Item
          label="Added Sugars"
          name={['labelNutrients', 'addedSugar', 'value']}
        >
          <InputNumber size="small" min={0} max={1000} step={0.1} />
        </Form.Item>

        <Form.Item
          label="Protein"
          name={['labelNutrients', 'protein', 'value']}
          rules={[
            {
              required: true,
              message: 'Required',
            },
          ]}
        >
          <InputNumber size="small" min={0} max={1000} step={0.1} />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Title level={5}>Micronutrients</Title>

        <Form.Item
          label="Calcium"
          name={['labelNutrients', 'calcium', 'value']}
        >
          <InputNumber size="small" min={0} max={1000} step={0.1} />
        </Form.Item>

        <Form.Item
          label="Iron"
          name={['labelNutrients', 'iron', 'value']}
        >
          <InputNumber size="small" min={0} max={1000} step={0.1} />
        </Form.Item>

        <Form.Item
          label="Potassium"
          name={['labelNutrients', 'potassium', 'value']}
        >
          <InputNumber size="small" min={0} max={1000} step={0.1} />
        </Form.Item>

        <Form.Item
          label="Vitamin A"
          name={['labelNutrients', 'vitaminA', 'value']}
        >
          <InputNumber size="small" min={0} max={1000} step={0.1} />
        </Form.Item>

        <Form.Item
          label="Vitamin C"
          name={['labelNutrients', 'vitaminC', 'value']}
        >
          <InputNumber size="small" min={0} max={1000} step={0.1} />
        </Form.Item>

        <Form.Item
          label="Vitamin D"
          name={['labelNutrients', 'vitaminD', 'value']}
        >
          <InputNumber size="small" min={0} max={1000} step={0.1} />
        </Form.Item>

        <Form.Item
          label="Vitamin B6"
          name={['labelNutrients', 'vitaminB6', 'value']}
        >
          <InputNumber size="small" min={0} max={1000} step={0.1} />
        </Form.Item>

        <Form.Item
          label="Vitamin B12"
          name={['labelNutrients', 'vitaminB12', 'value']}
        >
          <InputNumber size="small" min={0} max={1000} step={0.1} />
        </Form.Item>

        <Form.Item
          label="Copper"
          name={['labelNutrients', 'copper', 'value']}
        >
          <InputNumber size="small" min={0} max={1000} step={0.1} />
        </Form.Item>

        <Form.Item
          label="Zinc"
          name={['labelNutrients', 'zinc', 'value']}
        >
          <InputNumber size="small" min={0} max={1000} step={0.1} />
        </Form.Item>
      </Col>
    </Row>
  </Form>
);

ManualFoodEntryForm.propTypes = {
  form: PropTypes.shape({}).isRequired,
};

export default ManualFoodEntryForm;

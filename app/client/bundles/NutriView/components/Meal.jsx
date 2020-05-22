import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Col, Table, Card, Button,
} from 'antd';
import {
  PlusOutlined,
} from '@ant-design/icons';

import MealItems from './MealItems';
import AddFoodItemModal from './AddFoodItemModal';

const { Column } = Table;

const Meal = ({
  meal,
  foodItems,
  nutrientsData,
  addFoodItem,
  addSelectedFoodItemToMeal,
}) => {
  const [visible, setVisible] = useState(false);
  const mealNumber = `Meal ${meal.number}`;

  const onSave = (selectedFood) => {
    console.log('Received values of form: ', selectedFood);

    addSelectedFoodItemToMeal(selectedFood, meal)
      .then(() => {
        setVisible(false);
      })
      .catch((info) => {
        console.log(':', info);
      });
  };

  const handleAddFoodItemClick = () => {
    addFoodItem().then(() => setVisible(true));
  };

  return (
    <Col className="gutter-row" flex="155px" order={meal.number}>
      <Card bodyStyle={{ padding: 0 }}>
        <Card
          size="small"
          title={mealNumber}
          bodyStyle={{ height: 290, padding: 4, overflow: 'scroll' }}
          bordered={false}
          actions={[
            <Button
              size="small"
              icon={<PlusOutlined />}
              onClick={() => handleAddFoodItemClick()}
            >
              Add food item
            </Button>,
          ]}
        >
          <MealItems foodItems={foodItems} />
          <AddFoodItemModal
            visible={visible}
            onSave={onSave}
            onCancel={() => setVisible(false)}
          />
        </Card>
        <Table
          rowKey="nutrient"
          dataSource={nutrientsData}
          size="small"
          pagination={{ hideOnSinglePage: true }}
        >
          <Column title="Amount /serving" dataIndex="value" width={40} />
          <Column title="% Daily Value" dataIndex="% Daily Value" width={40} />
        </Table>
      </Card>
    </Col>
  );
};

Meal.propTypes = {
  meal: PropTypes.shape({
    number: PropTypes.number.isRequired,
  }).isRequired,
  foodItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  nutrientsData: PropTypes.arrayOf(PropTypes.object).isRequired,
  addFoodItem: PropTypes.func.isRequired,
  addSelectedFoodItemToMeal: PropTypes.func.isRequired,
};

export default Meal;

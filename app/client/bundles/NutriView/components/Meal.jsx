import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Col, Table, Card, Button,
} from 'antd';
import {
  PlusOutlined, DeleteOutlined,
} from '@ant-design/icons';

import MealItems from './MealItems';
import AddFoodItemModalContainer from '../containers/AddFoodItemModalContainer';

const { Column } = Table;

const Meal = ({
  meal,
  foodItems,
  mealFoodItems,
  nutrientsData,
  deleteMeal,
  removeFoodItemFromMeal,
}) => {
  const [visible, setVisible] = useState(false);

  const mealNumber = `Meal ${meal.number}`;

  const handleDeleteMealClick = () => {
    deleteMeal(meal);
  };

  const handleAddFoodItemClick = () => setVisible(true);

  return (
    <Col className="gutter-row" flex="152px" order={meal.number}>
      <Card bodyStyle={{ padding: 0 }}>
        <Card
          size="small"
          title={mealNumber}
          extra={(
            <Button
              size="small"
              onClick={() => handleDeleteMealClick()}
            >
              <DeleteOutlined />
            </Button>
          )}
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
          <MealItems
            mealId={meal.id}
            foodItems={foodItems}
            mealFoodItems={mealFoodItems}
            removeFoodItemFromMeal={removeFoodItemFromMeal}
          />

          <AddFoodItemModalContainer
            visible={visible}
            setVisible={setVisible}
            mealId={meal.id}
            mealFoodItemIds={meal.foodItems}
          />
        </Card>
        <Table
          rowKey="nutrient"
          dataSource={nutrientsData}
          size="small"
          tableLayout="fixed"
          pagination={{ hideOnSinglePage: true }}
        >
          <Column title="Meal Amount" dataIndex="value" width={41} />
          <Column
            title="% Daily Value"
            dataIndex="percentDailyValue"
            width={40}
            align="right"
            render={(text) => (text === null ? text : `${text}%`)}
          />
        </Table>
      </Card>
    </Col>
  );
};

Meal.propTypes = {
  meal: PropTypes.shape({
    id: PropTypes.number.isRequired,
    number: PropTypes.number.isRequired,
    foodItems: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  foodItems: PropTypes.shape({}).isRequired,
  mealFoodItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  nutrientsData: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteMeal: PropTypes.func.isRequired,
  removeFoodItemFromMeal: PropTypes.func.isRequired,
};

export default Meal;

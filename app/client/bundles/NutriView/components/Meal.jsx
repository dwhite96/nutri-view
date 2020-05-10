import React from 'react';
import PropTypes from 'prop-types';
import {
  Col, Table, Card, Button,
} from 'antd';
import {
  PlusOutlined,
} from '@ant-design/icons';

import MealItems from './MealItems';

const { Column } = Table;

const foods = [
  // {
  //   id: '1',
  //   name: 'Cascadian Farm Protein Bar',
  // },
  // {
  //   id: '2',
  //   name: '2 Hard Boiled Eggs',
  // },
  // {
  //   id: '3',
  //   name: 'Cascadian Farm Protein Bar',
  // },
];

const Meal = ({ meal }) => {
  const mealNumber = `Meal ${meal.number}`;

  return (
    <Col className="gutter-row" flex="155px" order={meal.number}>
      <Card bodyStyle={{ padding: 0 }}>
        <Card
          size="small"
          title={mealNumber}
          bodyStyle={{ height: 225 }}
          bordered={false}
          actions={[
            <Button size="small" icon={<PlusOutlined />}>Add food item</Button>,
          ]}
        >
          <MealItems foods={foods} />
        </Card>
        <Table
          rowKey="fdcId"
          dataSource={meal.foodItems}
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
    foodItems: PropTypes.arrayOf.isRequired,
  }).isRequired,
};

export default Meal;

import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Row, Col, Table, Card, List,
} from 'antd';

import Meal from './Meal';

const { Column } = Table;

const data3 = [
  {
    fdcId: 506463,
    value: '14',
    '% Daily Value': '7%',
  },
  {
    fdcId: 566821,
    value: '14',
    '% Daily Value': '12%',
  },
  {
    fdcId: 357068,
    value: '14',
    '% Daily Value': '18%',
  },
  {
    fdcId: 508576,
    value: '14',
    '% Daily Value': '9%',
  },
  {
    fdcId: 357068,
    value: '14',
    '% Daily Value': '18%',
  },
  {
    fdcId: 508576,
    value: '14',
    '% Daily Value': '9%',
  },
];

const mealData = [
  {
    number: 1,
    foodItems: data3,
  },
  {
    number: 2,
    foodItems: data3,
  },
  {
    number: 3,
    foodItems: data3,
  },
  {
    number: 4,
    foodItems: data3,
  },
  {
    number: 5,
    foodItems: data3,
  },
  {
    number: 6,
    foodItems: data3,
  },
];

const MealCollection = ({ meals }) => (
  meals.map((meal) => <Meal key={meal.number} meal={meal} />)
);

const MainMealsView = ({ meals, addMeal }) => (
  <>
    <Button
      type="link"
      onClick={() => addMeal(3)}
    >
      Add Meal
    </Button>

    <Row gutter={16} align="bottom">
      <Col className="gutter-row" flex="151px" order={0}>
        <List size="small">
          <List.Item>
            Calories
          </List.Item>
          <List.Item>
            Total Fat (g)
          </List.Item>
          <List.Item>
            Sodium (mg)
          </List.Item>
          <List.Item>
            Total Carbs (g)
          </List.Item>
          <List.Item>
            Total Sugars (g)
          </List.Item>
          <List.Item>
            Protein (g)
          </List.Item>
        </List>
      </Col>
      <MealCollection meals={meals} />
      <Col className="gutter-row" flex="155px" order={11}>
        <Card bodyStyle={{ padding: 0 }}>
          <Card
            size="small"
            title="Total"
            bodyStyle={{ height: 220 }}
            bordered={false}
          >
            <li>Coffee</li>
          </Card>
          <Table
            rowKey="fdcId"
            dataSource={data3}
            size="small"
            pagination={{ hideOnSinglePage: true }}
          >
            <Column title="Total Amount" dataIndex="value" width={40} />
            <Column title="% Daily Value" dataIndex="% Daily Value" width={40} />
          </Table>
        </Card>
      </Col>
    </Row>
  </>
);

MainMealsView.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  addMeal: PropTypes.func.isRequired,
};

export default MainMealsView;

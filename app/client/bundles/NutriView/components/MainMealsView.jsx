import React from 'react';
// import PropTypes from 'prop-types';
import {
  Row, Col, Table, Card, List,
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
  },
  {
    number: 2,
  },
  {
    number: 3,
  },
  {
    number: 4,
  },
  {
    number: 5,
  },
];

const MealCollection = ({ meals }) => (
  meals.map((meal) => <Meal key={meal.number} meal={meal} />)
);

const MainMealsView = () => (
  <Row gutter={16} align="bottom">
    <Col className="gutter-row" span={3}>
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
    <MealCollection meals={mealData} />
    <Col className="gutter-row" span={3}>
      <Card size="small" title="Total" style={{ height: 225 }}>
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
    </Col>
  </Row>
);

// MainMealsView.propTypes = {
//   foodItems: PropTypes.arrayOf(PropTypes.object).isRequired,
// };

export default MainMealsView;

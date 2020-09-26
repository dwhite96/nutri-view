import React from 'react';
import PropTypes from 'prop-types';
import {
  PageHeader, Button, Row, Col, Table, Card, List,
} from 'antd';

import Meal from '../containers/MealContainer';

const { Column } = Table;

const MealCollection = ({ meals }) => (
  meals.map((meal) => (
    <Meal
      key={meal.number}
      meal={meal}
    />
  ))
);

const MainMealsView = ({ meals, total, addMeal }) => (
  <div>
    <PageHeader
      className="site-page-header"
      title="Meals"
      extra={[
        <Button key="3">Operation</Button>,
        <Button
          key="1"
          onClick={() => addMeal()}
        >
          Add Meal
        </Button>,
      ]}
    >
      Daily Meal Plan
    </PageHeader>

    <Row gutter={16} align="bottom">
      <Col className="gutter-row" flex="157px" order={0}>
        <List size="small">
          <List.Item>
            Calories
          </List.Item>
          <List.Item>
            Total Fat (g)
          </List.Item>
          <List.Item>
            Cholesterol (mg)
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
          <Table
            rowKey="nutrient"
            dataSource={total}
            size="small"
            title={() => 'Total'}
            pagination={{ hideOnSinglePage: true }}
          >
            <Column title="Total Amount" dataIndex="value" width={40} />
            <Column title="% Daily Value" dataIndex="% Daily Value" width={40} />
          </Table>
        </Card>
      </Col>
    </Row>
  </div>
);

MainMealsView.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  total: PropTypes.arrayOf(PropTypes.object).isRequired,
  addMeal: PropTypes.func.isRequired,
};

export default MainMealsView;

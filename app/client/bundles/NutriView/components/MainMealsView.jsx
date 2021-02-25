import React from 'react';
import PropTypes from 'prop-types';
import {
  PageHeader, Button, Row, Col, Table, Card, List, Typography, Spin,
} from 'antd';

import Meal from '../containers/MealContainer';

const { Column } = Table;

const { Text } = Typography;

const MealCollection = ({ meals }) => (
  meals.map((meal) => (
    <Meal
      key={meal.number}
      meal={meal}
    />
  ))
);

const Content = () => (
  <Text>Daily Meal Plan</Text>
);

const MainMealsView = ({
  meals, dataFetchStatus, total, addMeal,
}) => {
  if (Array.isArray(meals) && meals.length === 0) {
    return (
      <div>
        <PageHeader
          className="site-page-header"
          title="You have no meals saved"
          extra={[
            <Spin key="1" spinning={dataFetchStatus === 'loading'} />,
            <Button key="2" onClick={() => addMeal()}>
              Add Meal
            </Button>,
          ]}
        >
          <p>Click &quot;Add Meal&quot; to create first meal and start adding food</p>
        </PageHeader>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        className="site-page-header"
        title="Meals"
        extra={[
          <Spin key="1" spinning={dataFetchStatus === 'loading'} />,
          <Button key="2" onClick={() => addMeal()}>
            Add Meal
          </Button>,
        ]}
      >
        <Content />
      </PageHeader>
      <Row gutter={12} align="bottom" wrap={false}>
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

        <Col className="gutter-row" flex="152px" order={11}>
          <Card bodyStyle={{ padding: 0 }}>
            <Table
              rowKey="nutrient"
              dataSource={total}
              size="small"
              tableLayout="fixed"
              title={() => 'Total'}
              pagination={{ hideOnSinglePage: true }}
            >
              <Column
                title="Total Amount"
                dataIndex="value"
                width={40}
              />
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
      </Row>
    </div>
  );
};

MainMealsView.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  total: PropTypes.arrayOf(PropTypes.object).isRequired,
  dataFetchStatus: PropTypes.string.isRequired,
  addMeal: PropTypes.func.isRequired,
};

export default MainMealsView;

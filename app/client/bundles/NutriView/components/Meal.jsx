import React from 'react';
import PropTypes from 'prop-types';
import {
  Col, Table, Card, Menu, Dropdown, Button,
} from 'antd';
import {
  PlusOutlined, DownOutlined,
} from '@ant-design/icons';

const { Column } = Table;

const foods = [
  {
    id: '1',
    name: 'Cascadian Farm Protein Bar',
  },
  {
    id: '2',
    name: '2 Hard Boiled Eggs',
  },
  {
    id: '3',
    name: 'Cascadian Farm Protein Bar',
  },
];

const menu = (
  <Menu>
    <Menu.Item key="0">
      Remove from meal
    </Menu.Item>
    <Menu.Item key="1">
      Move to another meal
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="2">3rd menu item</Menu.Item>
  </Menu>
);

const mealItems = foods.map((food) => (
  <li key={food.id}>
    <Dropdown overlay={menu} trigger={['click']}>
      <Button
        type="link"
        size="small"
        block="true"
        style={{
          whiteSpace: 'normal',
          border: 'none',
          height: 44,
          padding: 0,
        }}
      >
        <span>
          <span>{food.name}</span>
          &nbsp;
          <DownOutlined />
        </span>
      </Button>
    </Dropdown>
  </li>
));

const Meal = ({ meal }) => {
  const mealNumber = `Meal ${meal.number}`;

  return (
    <Col className="gutter-row" flex="155px" order={meal.number}>
      <Card bodyStyle={{ padding: 0 }}>
        <Card
          size="small"
          title={mealNumber}
          style={{ height: 243 }}
          bordered={false}
          actions={[
            <Button size="small" icon={<PlusOutlined />}>Add food item</Button>,
          ]}
        >
          {mealItems}
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

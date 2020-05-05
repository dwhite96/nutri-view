import React from 'react';
import PropTypes from 'prop-types';
import {
  Col, Table, Card, Menu, Dropdown, Button,
} from 'antd';
import {
  EditOutlined, EllipsisOutlined, SettingOutlined, DownOutlined,
} from '@ant-design/icons';

const { Column } = Table;

const data1 = [
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
    fdcId: 506463,
    value: '14',
    '% Daily Value': '7%',
  },
  {
    fdcId: 566821,
    value: '14',
    '% Daily Value': '12%',
  },
];

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
    <Col className="gutter-row" flex="155px">
      <Card
        size="small"
        title={mealNumber}
        style={{ height: 245 }}
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        {mealItems}
      </Card>
      <Table
        rowKey="fdcId"
        dataSource={data1}
        size="small"
        pagination={{ hideOnSinglePage: true }}
      >
        <Column title="Amount /serving" dataIndex="value" width={40} />
        <Column title="% Daily Value" dataIndex="% Daily Value" width={40} />
      </Table>
    </Col>
  );
};

Meal.propTypes = {
  meal: PropTypes.shape({
    number: PropTypes.number.isRequired,
  }).isRequired,
};

export default Meal;

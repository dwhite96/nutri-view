import React from 'react';
// import PropTypes from 'prop-types';

import {
  Row, Col, Table, Card, List,
} from 'antd';

const { Column } = Table;

const data1 = [
  {
    'fdcId': 357068,
    'value': '14',
    '% Daily Value': '18%',
  },
  {
    'fdcId': 508576,
    'value': '14',
    '% Daily Value': '9%',
  },
  {
    'fdcId': 506463,
    'value': '14',
    '% Daily Value': '7%',
  },
  {
    'fdcId': 566821,
    'value': '14',
    '% Daily Value': '12%',
  },
  {
    'fdcId': 506463,
    'value': '14',
    '% Daily Value': '7%',
  },
  {
    'fdcId': 566821,
    'value': '14',
    '% Daily Value': '12%',
  },
];

const data2 = [
  {
    'fdcId': 506463,
    'value': '14',
    '% Daily Value': '7%',
  },
  {
    'fdcId': 566821,
    'value': '14',
    '% Daily Value': '12%',
  },
  {
    'fdcId': 357068,
    'value': '14',
    '% Daily Value': '18%',
  },
  {
    'fdcId': 508576,
    'value': '14',
    '% Daily Value': '9%',
  },
  {
    'fdcId': 357068,
    'value': '14',
    '% Daily Value': '18%',
  },
  {
    'fdcId': 508576,
    'value': '14',
    '% Daily Value': '9%',
  },
];

const data3 = [
  {
    'fdcId': 506463,
    'value': '14',
    '% Daily Value': '7%',
  },
  {
    'fdcId': 566821,
    'value': '14',
    '% Daily Value': '12%',
  },
  {
    'fdcId': 357068,
    'value': '14',
    '% Daily Value': '18%',
  },
  {
    'fdcId': 508576,
    'value': '14',
    '% Daily Value': '9%',
  },
  {
    'fdcId': 357068,
    'value': '14',
    '% Daily Value': '18%',
  },
  {
    'fdcId': 508576,
    'value': '14',
    '% Daily Value': '9%',
  },
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
};

const MainMealsView = () => (
  <>
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

      <Col className="gutter-row" span={3}>
        <Card size="small" title="Meal 1" style={{ height: 225 }}>
          <li>Cascadian Farm Protein Bar</li>
          <li>2 Hard Boiled Eggs</li>
          <li>Cascadian Farm Protein Bar</li>
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

      <Col className="gutter-row" span={3}>
        <Card size="small" title="Meal 2" style={{ height: 225 }}>
          <li>Cascadian Farm Protein Bar</li>
          <li>2 Hard Boiled Eggs</li>
          <li>Cascadian Farm Protein Bar</li>
        </Card>
        <Table
          rowKey="fdcId"
          dataSource={data2}
          size="small"
          pagination={{ hideOnSinglePage: true }}
        >
          <Column title="Amount /serving" dataIndex="value" width={40} />
          <Column title="% Daily Value" dataIndex="% Daily Value" width={40} />
        </Table>
      </Col>

      <Col className="gutter-row" span={3}>
        <Card size="small" title="Meal 3" style={{ height: 225 }}>
          <li>Cascadian Farm Protein Bar</li>
          <li>2 Hard Boiled Eggs</li>
        </Card>
        <Table
          rowKey="fdcId"
          dataSource={data3}
          size="small"
          pagination={{ hideOnSinglePage: true }}
        >
          <Column title="Amount /serving" dataIndex="value" width={40} />
          <Column title="% Daily Value" dataIndex="% Daily Value" width={40} />
        </Table>
      </Col>

      <Col className="gutter-row" span={3}>
        <Card size="small" title="Meal 4" style={{ height: 225 }}>
          <li>Cascadian Farm</li>
        </Card>
        <Table
          rowKey="fdcId"
          dataSource={data3}
          size="small"
          pagination={{ hideOnSinglePage: true }}
        >
          <Column title="Amount /serving" dataIndex="value" width={40} />
          <Column title="% Daily Value" dataIndex="% Daily Value" width={40} />
        </Table>
      </Col>

      <Col className="gutter-row" span={3}>
        <Card size="small" title="Meal 5" style={{ height: 225 }}>
          <li>Cascadian Farm Protein Bar</li>
          <li>2 Hard Boiled Eggs</li>
          <li>Cascadian Farm Protein Bar</li>
        </Card>
        <Table
          rowKey="fdcId"
          dataSource={data3}
          size="small"
          pagination={{ hideOnSinglePage: true }}
        >
          <Column title="Amount /serving" dataIndex="value" width={40} />
          <Column title="% Daily Value" dataIndex="% Daily Value" width={40} />
        </Table>
      </Col>

      <Col className="gutter-row" span={3}>
        <Card size="small" title="Meal 6" style={{ height: 225 }}>
          <li>Cascadian Farm Protein Bar</li>
          <li>2 Hard Boiled Eggs</li>
          <li>Cascadian Farm Protein Bar</li>
        </Card>
        <Table
          rowKey="fdcId"
          dataSource={data3}
          size="small"
          pagination={{ hideOnSinglePage: true }}
        >
          <Column title="Amount /serving" dataIndex="value" width={40} />
          <Column title="% Daily Value" dataIndex="% Daily Value" width={40} />
        </Table>
      </Col>

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
  </>
);

// MainMealsView.propTypes = {
//   foodItems: PropTypes.arrayOf(PropTypes.object).isRequired,
// };

export default MainMealsView;

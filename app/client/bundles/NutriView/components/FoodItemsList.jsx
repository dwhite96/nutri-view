import React from 'react';
import PropTypes from 'prop-types';

import { Table } from 'antd';

const { Column } = Table;

// const columns = [
//   {
//     title: 'Description',
//     dataIndex: 'description',
//   },
//   {
//     title: 'Brand',
//     dataIndex: 'brandOwner',
//   },
// ];

const data = [
  {
    'fdcId': 357068,
    'description': 'CHEESE',
    'dataType': 'Branded',
    'gtinUpc': '769087000616',
    'publishedDate': '2019-04-01',
    'brandOwner': 'Quesos La Ricura',
  },
  {
    'fdcId': 508576,
    'description': 'CHEESE',
    'dataType': 'Branded',
    'gtinUpc': '856274005056',
    'publishedDate': '2019-04-01',
    'brandOwner': 'Kool Tart',
  },
  {
    'fdcId': 506463,
    'description': 'CHEESE',
    'dataType': 'Branded',
    'gtinUpc': '817944010640',
    'publishedDate': '2019-04-01',
    'brandOwner': 'Murray Products LLC',
  },
  {
    'fdcId': 566821,
    'description': 'CHEESE',
    'dataType': 'Branded',
    'gtinUpc': '070852992686',
    'publishedDate': '2019-04-01',
    'brandOwner': 'Clover Stornetta Farms, Inc.',
  },
];

// rowSelection object indicates the need for row selection

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },

  getCheckboxProps: (record) => ({
    fdcId: record.fdcId,
  }),
};

const FoodItemsList = ({ foodItems }) => (
  <Table
    rowKey="fdcId"
    rowSelection={{
      type: 'radio',
      ...rowSelection,
    }}
    dataSource={data}
    scroll={{ y: 240 }}
  >
    <Column title="Description" dataIndex="description" />
    <Column title="Brand" dataIndex="brandOwner" />
  </Table>
);

FoodItemsList.propTypes = {
  foodItems: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FoodItemsList;

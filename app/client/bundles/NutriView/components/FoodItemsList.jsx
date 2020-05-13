import React from 'react';
import PropTypes from 'prop-types';

import { Table } from 'antd';

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },

  getCheckboxProps: (record) => ({
    fdcId: record.fdcId,
  }),
};

const FoodItemsList = ({ foodItems }) => {
  const columns = [
    {
      title: 'Description',
      dataIndex: ['data', 'description'],
    },
    {
      title: 'Brand',
      dataIndex: ['data', 'brandOwner'],
    },
  ];

  return (
    <Table
      rowKey="id"
      rowSelection={{
        type: 'radio',
        ...rowSelection,
      }}
      dataSource={foodItems}
      columns={columns}
      scroll={{ y: 'calc(100vh - 400px' }}
      pagination={{
        hideOnSinglePage: true,
        defaultPageSize: 100,
      }}
    />
  );
};

FoodItemsList.propTypes = {
  foodItems: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FoodItemsList;

import React from 'react';
import PropTypes from 'prop-types';

import { Table } from 'antd';

const FoodItemsList = ({ foodItems, setSelectedFood }) => {
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },

    onSelect: (record) => {
      setSelectedFood(record.id);
    },
  };

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
      size="small"
      rowKey="id"
      rowSelection={{
        type: 'radio',
        ...rowSelection,
      }}
      dataSource={foodItems.response}
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
  setSelectedFood: PropTypes.func.isRequired,
};

export default FoodItemsList;

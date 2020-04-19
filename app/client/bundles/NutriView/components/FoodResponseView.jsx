import React from 'react';
import PropTypes from 'prop-types';
import { Table, Typography } from 'antd';

const { Column } = Table;
const { Text } = Typography;

const FoodResponseView = ({ response, setSelectedFood }) => {
  const { foods } = response;

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },

    onSelect: (record) => {
      setSelectedFood(record.fdcId);
    },
  };

  // FDC foods array exists and has at least one food item
  if (Array.isArray(foods) && foods.length > 0) {
    return (
      <Table
        rowKey="fdcId"
        rowSelection={{
          type: 'radio',
          ...rowSelection,
        }}
        dataSource={foods}
        scroll={{ y: 600 }}
        pagination={{
          hideOnSinglePage: true,
          defaultPageSize: 100,
        }}
      >
        <Column title="Description" dataIndex="description" />
        <Column title="Brand" dataIndex="brandOwner" />
      </Table>
    );
  }

  // FDC foods array exists and has no food items
  if (Array.isArray(response.foods) && response.foods.length === 0) {
    return (
      <div>
        <Text>No food in response</Text>
      </div>
    );
  }

  if (response.message) {
    return (
      <div>
        <Text>{response.message}</Text>
      </div>
    );
  }

  if (response.error) {
    return (
      <div>
        <Text>{response.error.code}</Text>
      </div>
    );
  }
  return null;
};

FoodResponseView.propTypes = {
  response: PropTypes.shape({
    foods: PropTypes.Array,
    message: PropTypes.string,
    error: PropTypes.Object,
  }).isRequired,
  setSelectedFood: PropTypes.func.isRequired,
};

export default FoodResponseView;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'antd';
import { includes } from 'lodash';

const FoodItemsList = ({
  foodSearchList, mealFoodItemIds, setSelectedFood, changeModalForm,
}) => {
  const [disabled, setDisabled] = useState(true);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },

    onSelect: (record) => {
      setSelectedFood(record.id);
      setDisabled(false);
    },

    getCheckboxProps: (record) => ({
      // Disable checkbox for food item already in meal
      disabled: includes(mealFoodItemIds, record.id),
    }),
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
    <div>
      <Table
        size="small"
        rowKey="id"
        rowSelection={{
          type: 'radio',
          ...rowSelection,
        }}
        dataSource={foodSearchList}
        columns={columns}
        scroll={{ y: 'calc(100vh - 400px' }}
        pagination={{
          hideOnSinglePage: true,
          defaultPageSize: 100,
        }}
      />
      <Button type="primary" onClick={changeModalForm} disabled={disabled}>
        Next
      </Button>
    </div>
  );
};

FoodItemsList.propTypes = {
  foodSearchList: PropTypes.arrayOf(PropTypes.object).isRequired,
  mealFoodItemIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  setSelectedFood: PropTypes.func.isRequired,
  changeModalForm: PropTypes.func.isRequired,
};

export default FoodItemsList;

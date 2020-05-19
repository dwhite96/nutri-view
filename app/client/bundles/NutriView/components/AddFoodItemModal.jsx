import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

import FoodItemsListContainer from '../containers/FoodItemsListContainer';

const AddFoodItemModal = ({
  visible,
  onSave,
  onCancel,
}) => {
  const [selectedFood, setSelectedFood] = useState(0);

  return (
    <Modal
      title="Add food item to meal"
      visible={visible}
      okText="Save"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        onSave(selectedFood);
      }}
    >
      <FoodItemsListContainer setSelectedFood={setSelectedFood} />
    </Modal>
  );
};

AddFoodItemModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default AddFoodItemModal;

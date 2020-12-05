import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Modal, Form, Button,
} from 'antd';

import FDCFoodSearch from './FDCFoodSearch';
import ManualFoodEntryForm from './ManualFoodEntryForm';

const FoodSearchInputModal = ({
  visible,
  dataFetchStatus,
  response,
  setVisible,
  searchFood,
  saveFood,
  clearFoodSearchList,
}) => {
  const [form] = Form.useForm();

  const [selectedFood, setSelectedFood] = useState(0);

  const [formSection, setFormSection] = useState(1);

  let modalContent;

  const setDefaultState = () => {
    setVisible(false);
    form.resetFields();
    setSelectedFood(0);
    setFormSection(1);
    clearFoodSearchList();
  };

  const changeModalForm = () => setFormSection(2);

  const onSave = (event) => {
    event.preventDefault();

    form
      .validateFields()
      .then((values) => {
        const newValues = { ...values, ...{ selectedFood } };

        saveFood(newValues);

        setDefaultState();
      })
      .catch((info) => console.log(':', info)); // eslint-disable-line no-console
  };

  const onCancel = () => {
    setDefaultState();
  };

  if (formSection === 1) {
    modalContent = (
      <FDCFoodSearch
        form={form}
        response={response}
        setSelectedFood={setSelectedFood}
        dataFetchStatus={dataFetchStatus}
        searchFood={searchFood}
      />
    );
  } else {
    modalContent = (
      <ManualFoodEntryForm form={form} />
    );
  }

  return (
    <Modal
      title="Food Data Central Food Search"
      visible={visible}
      width={1000}
      destroyOnClose
      footer={[
        <Button key="manual entry" onClick={changeModalForm}>
          Enter Food Manually
        </Button>,
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="save"
          htmlType="submit"
          type="primary"
          disabled={formSection === 1 && selectedFood === 0}
          onClick={(event) => onSave(event)}
        >
          Save
        </Button>,
      ]}
      onOk={onSave}
      onCancel={onCancel}
    >
      {modalContent}
    </Modal>
  );
};

FoodSearchInputModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  dataFetchStatus: PropTypes.string.isRequired,
  response: PropTypes.shape({}).isRequired,
  setVisible: PropTypes.func.isRequired,
  searchFood: PropTypes.func.isRequired,
  saveFood: PropTypes.func.isRequired,
  clearFoodSearchList: PropTypes.func.isRequired,
};

export default FoodSearchInputModal;

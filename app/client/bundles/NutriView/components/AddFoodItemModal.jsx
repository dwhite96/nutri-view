import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Spin } from 'antd';

import DisplayFoodSearchForm from './DisplayFoodSearchForm';
import DisplayFoodDataForm from './DisplayFoodDataForm';

const AddFoodItemModal = ({
  visible,
  setVisible,
  mealId,
  mealFoodItemIds,
  foodSearchList,
  dataFetchStatus,
  nutriViewDatabaseSearch,
  addSelectedFoodItemToMeal,
  clearFoodSearchList,
}) => {
  const [form] = Form.useForm();

  const [selectedFood, setSelectedFood] = useState(0);

  const [formSection, setFormSection] = useState(1);

  const modalOkButtonDisabled = formSection === 1;

  let modalContent;

  const changeModalForm = () => setFormSection(2);

  const onSave = (servings) => {
    addSelectedFoodItemToMeal(selectedFood, mealId, servings);
    setVisible(false);
    setFormSection(1);
    clearFoodSearchList();
  };

  const onCancel = () => {
    setVisible(false);
    setFormSection(1);
    clearFoodSearchList();
  };

  const getSelectedFoodData = () => {
    const foodItem = foodSearchList.find((food) => food.id === selectedFood);

    return foodItem.data;
  };

  if (formSection === 1) {
    modalContent = (
      <DisplayFoodSearchForm
        form={form}
        foodSearchList={foodSearchList}
        mealFoodItemIds={mealFoodItemIds}
        setSelectedFood={setSelectedFood}
        changeModalForm={changeModalForm}
        nutriViewDatabaseSearch={nutriViewDatabaseSearch}
      />
    );
  } else {
    modalContent = (
      <DisplayFoodDataForm
        form={form}
        // foodData={foodSearchList[selectedFood].data}
        foodData={getSelectedFoodData()}
      />
    );
  }

  return (
    <Modal
      title="Add food item to meal"
      visible={visible}
      okText="Save"
      okButtonProps={{ disabled: modalOkButtonDisabled }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => onSave(values))
          .then(() => form.resetFields());
      }}
      cancelText="Cancel"
      onCancel={onCancel}
      width={1000}
      destroyOnClose
    >
      <Spin key="1" spinning={dataFetchStatus === 'loading'}>
        {modalContent}
      </Spin>
    </Modal>
  );
};

AddFoodItemModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  mealId: PropTypes.number.isRequired,
  mealFoodItemIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  foodSearchList: PropTypes.arrayOf(PropTypes.object).isRequired,
  dataFetchStatus: PropTypes.string.isRequired,
  nutriViewDatabaseSearch: PropTypes.func.isRequired,
  addSelectedFoodItemToMeal: PropTypes.func.isRequired,
  clearFoodSearchList: PropTypes.func.isRequired,
};

export default AddFoodItemModal;

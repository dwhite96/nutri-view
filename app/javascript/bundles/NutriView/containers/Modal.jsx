import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import { closeModal } from '../actions/nutriViewActionCreators';
import FoodSearchInput from './FoodSearchInputContainer';

const MODAL_COMPONENTS = {
  FOOD_SEARCH_INPUT: FoodSearchInput,
};

const Modal = ({ isOpen, modalType, closeModal }) => {
  if (!modalType) {
    return null;
  }

  const SpecificModal = MODAL_COMPONENTS[modalType];

  return (
    <ReactModal
      isOpen={isOpen}
      contentLabel="Food Search Input"
      appElement={document.getElementById('root')}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
    >
      <button
        onClick={closeModal}
        className="close-button"
        type="button"
      >
        <span aria-hidden="true">&times;</span>
      </button>
      <SpecificModal />
    </ReactModal>
  );
};

const mapStateToProps = (state) => ({
  isOpen: state.modal.isOpen,
  modalType: state.modal.modalType,
});

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModal()),
});

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Modal);

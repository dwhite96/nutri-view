import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'antd';

const TriggerMessagePopup = ({ content }) => {
  if (content.error) {
    return (
      <Alert
        style={{ position: 'fixed', zIndex: 1 }}
        type="error"
        message={content.error}
        closable
      />
    );
  }

  return null;
};

TriggerMessagePopup.propTypes = {
  content: PropTypes.shape({
    error: PropTypes.string,
  }).isRequired,
};

export default TriggerMessagePopup;

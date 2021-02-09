import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ errorMessage, successMessage }) => {
  if (errorMessage === '' && successMessage === '') {
    return null;
  } if (errorMessage === '') {
    return (
      <div
        className="notification is-success"
        style={{
          position: 'absolute',
          right: 0,
        }}
      >
        {successMessage}
      </div>
    );
  }
  return (
    <div
      className="notification is-danger"
      style={{
        position: 'absolute',
        right: 0,
      }}
    >
      {errorMessage}
    </div>
  );
};

Notification.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  successMessage: PropTypes.string.isRequired,
};

export default Notification;

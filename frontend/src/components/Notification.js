import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ errorMessage, successMessage }) => {
  if (errorMessage === '' && successMessage === '') {
    return null;
  }
  return (
    <div
      className={errorMessage === ''
        ? 'notification is-success'
        : 'notification is-danger'}
      style={{
        position: 'absolute',
        right: 0,
      }}
    >
      {errorMessage === ''
        ? successMessage
        : errorMessage}
    </div>
  );
};

Notification.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  successMessage: PropTypes.string.isRequired,
};

export default Notification;

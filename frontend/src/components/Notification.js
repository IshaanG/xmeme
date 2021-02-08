import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ errorMessage, successMessage }) => {
  if (errorMessage === '' && successMessage === '') {
    return null;
  } if (errorMessage === '') {
    return (
      <div className="notification is-success is-pulled-right">
        {successMessage}
      </div>
    );
  }
  return (
    <div className="notification is-danger is-pulled-right">
      {errorMessage}
    </div>
  );
};

Notification.propTypes = {
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
};
Notification.defaultProps = {
  errorMessage: '',
  successMessage: '',
};

export default Notification;

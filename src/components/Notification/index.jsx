import React from 'react';

import './notification.css';
import propTypes from 'prop-types';

export default function Notification({ message, handleClose, success }) {
  return (
    <div className={`notification-card ${success ? 'success-bg' : 'error-bg'}`}>
      <div className="message">
        <p className={`${success ? 'success-text' : 'error-text'}`}>{message}</p>
      </div>
      <div
        className={`close-button ${success ? 'success-bg success-text' : 'error-bg error-text'} `}
        data-testid="X"
        onClick={() => handleClose()}>
        X
      </div>
    </div>
  );
}
Notification.propTypes = {
  message: propTypes.string,
  handleClose: propTypes.func,
  success: propTypes.bool,
};

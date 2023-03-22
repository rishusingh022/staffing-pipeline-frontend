import React from 'react';

import './notification.css';
import propTypes from 'prop-types';
import { FiXCircle } from 'react-icons/fi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

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
        <FontAwesomeIcon icon={faCircleXmark} size={20} />
      </div>
    </div>
  );
}
Notification.propTypes = {
  message: propTypes.string,
  handleClose: propTypes.func,
  success: propTypes.bool,
};

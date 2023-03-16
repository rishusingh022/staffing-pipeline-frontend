import React from 'react';

import './notification.css';
import propTypes from 'prop-types';

export default function Notification({ message, handleClose }) {
  return (
    <div className={'notification-card'}>
      <div className="message">
        <p>{message}</p>
      </div>
      <div className="close-button" data-testid="X" onClick={() => handleClose()}>
        X
      </div>
    </div>
  );
}
Notification.propTypes = {
  message: propTypes.string,
  handleClose: propTypes.func,
};

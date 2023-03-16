import React from 'react';

import './InputComponent.css';

import propTypes from 'prop-types';

export default function InputComponent({ placeholder, handleChange, type }) {
  return (
    <div>
      <input type={type} className={'login-input'} placeholder={placeholder} onChange={handleChange} />
    </div>
  );
}

InputComponent.propTypes = {
  placeholder: propTypes.string,
  handleChange: propTypes.func,
  type: propTypes.string,
};

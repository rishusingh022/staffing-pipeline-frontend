import * as React from 'react';
import './CardContainer.css';
import PropTypes from 'prop-types';
const CardContainer = props => {
  return (
    <div className="grow-1">
      <div className="grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-4">{props.children}</div>
    </div>
  );
};
export default CardContainer;

CardContainer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

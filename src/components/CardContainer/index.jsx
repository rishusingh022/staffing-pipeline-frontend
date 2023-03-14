import * as React from 'react';
import './CardContainer.css';
import PropTypes from 'prop-types';
const CardContainer = props => {
  return <div className="grid grid-cols-1 h-full gap-x-14 gap-y-8 lg:grid-cols-4 md:grid-cols-2">{props.children}</div>;
};
export default CardContainer;

CardContainer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

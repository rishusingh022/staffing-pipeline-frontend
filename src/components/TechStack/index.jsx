import React from 'react';
import './TechStack.css';
import { BiCodeBlock } from 'react-icons/bi';
import PropTypes from 'prop-types';

const TechStack = ({ techName }) => {
  return (
    <div className="all-tech-stack-cards">
      <div className="tech-stack-card">
        <div>
          <BiCodeBlock className="tech-icon" />
        </div>

        <div>
          <p className="tech-stack-name">{techName}</p>
        </div>
      </div>
    </div>
  );
};
TechStack.propTypes = {
  techName: PropTypes.string.isRequired,
};
export default TechStack;

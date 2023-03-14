import React from 'react';
import Image from '../Image';
import './caseStudyCards.css';
import PropTypes from 'prop-types';

export default function CaseStudyCards({ caseStudyId }) {
  return (
    <>
      <div className="case-study-image">
        <Image imageUrl={'http://surl.li/fkwje'} altText={'test-image'} />
      </div>
      <div className="case-study-box">
        <div className="case-study-date">{caseStudyId}</div>
      </div>
    </>
  );
}

CaseStudyCards.propTypes = {
  caseStudyId: PropTypes.string.isRequired,
};

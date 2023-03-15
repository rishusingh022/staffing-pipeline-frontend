import React from 'react';
import Image from '../Image';
import './horizontalCaseStudyCards.css';
import PropTypes from 'prop-types';
export default function HorizontalCaseStudyCards({ caseStudyId }) {
  return (
    <>
      <div className="case-study-card-container">
        <div className="case-study-image">
          <Image imageUrl={'http://surl.li/fkwje'} altText={'test-image'} />
        </div>
        <div className="case-study-detail-box">
          <div className="case-study-name text-base font-bold">{caseStudyId}</div>
          <div className="case-study-upload-date text-xs text-gray-500">uploaded on 23/02/23</div>
        </div>
      </div>
    </>
  );
}
HorizontalCaseStudyCards.propTypes = {
  caseStudyId: PropTypes.string.isRequired,
};

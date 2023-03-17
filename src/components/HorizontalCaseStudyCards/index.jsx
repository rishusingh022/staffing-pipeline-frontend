import React from 'react';
import Image from '../Image';
import './horizontalCaseStudyCards.css';
import PropTypes from 'prop-types';
import formatDate from '../../utils/dateTime';
export default function HorizontalCaseStudyCards({ caseStudyName, caseStudyDate }) {
  const date = formatDate(caseStudyDate);

  return (
    <>
      <div className="case-study-card-container">
        <div className="case-study-image">
          <Image imageUrl={'http://surl.li/fkwje'} altText={'test-image'} />
        </div>
        <div className="case-study-detail-box">
          <div className="case-study-name text-base font-bold">{caseStudyName}</div>
          <div className="case-study-upload-date text-xs text-gray-500">uploaded on {date}</div>
        </div>
      </div>
    </>
  );
}
HorizontalCaseStudyCards.propTypes = {
  caseStudyName: PropTypes.string.isRequired,
  caseStudyDate: PropTypes.string.isRequired,
};

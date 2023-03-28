import React from 'react';
import Image from '../Image';
import './horizontalCaseStudyCards.css';
import PropTypes from 'prop-types';
import { formatDate } from '../../utils/dateTime';
import { FiLink2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import defaultImage from '../../assets/images/engagement-default.png';
export default function HorizontalCaseStudyCards({ caseStudyName, caseStudyDate, caseStudyImage, boxLink }) {
  const date = formatDate(caseStudyDate);

  return (
    <>
      <div className="case-study-card-container">
        <div className="case-study-image">
          <Image imageUrl={caseStudyImage ? caseStudyImage : defaultImage} altText={'case-study-image'} />
        </div>
        <div className="case-study-detail-box">
          <div className="flex justify-between">
            <div className="case-study-name text-base font-bold">{caseStudyName}</div>
            <Link to={boxLink} target="_blank">
              <FiLink2 size={20} className="hover:text-electricBlue cursor-pointer"></FiLink2>
            </Link>
          </div>
          <div className="case-study-upload-date text-xs text-gray-500">uploaded on {date}</div>
        </div>
      </div>
    </>
  );
}
HorizontalCaseStudyCards.propTypes = {
  caseStudyName: PropTypes.string.isRequired,
  caseStudyDate: PropTypes.string.isRequired,
  caseStudyImage: PropTypes.string.isRequired,
  boxLink: PropTypes.string.isRequired,
};

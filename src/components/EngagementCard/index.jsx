import React, { useContext } from 'react';
import Image from '../Image';
import './EngagementCard.css';
import { BsArrowRight } from 'react-icons/bs';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import DefaultImage from '../../assets/images/engagement-default.png';
import capitalizeFirstLetter from '../../utils/common/stringUtil';
import { FeatureContext } from '../../context/FeatureContext';
import allFeatures from '../../constants/allFeatures';

export default function EngagementCard({ imageUrl, altText, identityNumber, name, startDate, status }) {
  const navigate = useNavigate();
  const { userInfo } = useContext(FeatureContext);
  return (
    <div className="bg-white shadow-lg flex flex-col w-56 engagement-card-style" data-testid="image-card">
      <Image imageUrl={imageUrl ? imageUrl : DefaultImage} altText={altText} />
      <div className="px-3 py-2">
        {/* <div className="text-xs mb-1">{identityNumber}</div> */}
        <div className="font-bold text-xl mb-1 engagement-name">{name}</div>
        <div className={'font-semibold text-xs mb-1'}>
          Start Date: <span className={!startDate ? 'text-red-600' : ''}>{startDate ? startDate : 'not defined'}</span>
        </div>
        <div className="font-medium text-xs mb-1 text-gray-500">
          {status ? capitalizeFirstLetter(status) : 'Status'}
        </div>
      </div>
      {userInfo?.featureAccess?.includes(allFeatures.read_engagement) && (
        <div
          data-testid="read-more-button"
          className="link-button self-end text-xs mb-2 font-medium cursor-pointer hover:text-blue-800"
          onClick={() => {
            navigate(`/projects/${identityNumber}`);
          }}>
          Read More
          <BsArrowRight className="inline-block mx-2" />
        </div>
      )}
    </div>
  );
}

EngagementCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  identityNumber: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

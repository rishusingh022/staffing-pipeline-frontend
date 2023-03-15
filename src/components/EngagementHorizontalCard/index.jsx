import React from 'react';
import './EngagementHorizontalCard.css';
import ArrowIcon from '../../assets/images/Vector.png';
import ProjectImage from '../../assets/images/engagement-default.png';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function EngagementHorizontalCard({ engagementImage, engagementId, engagementTitle }) {
  const navigate = useNavigate();
  const handleViewMore = () => {
    navigate(`/projects/${engagementId}`);
  };
  return (
    <div className="engagement-card-container">
      <img className="engagement-img" src={engagementImage ? engagementImage : ProjectImage}></img>
      <div className="engagement-details">
        <p className="engagement-id">{engagementId}</p>
        <p className="engagement-title">{engagementTitle}</p>
        <div className="engagement-bottom-btn" onClick={handleViewMore}>
          <div>
            <p>View</p>
            <img src={ArrowIcon}></img>
          </div>
        </div>
      </div>
    </div>
  );
}

EngagementHorizontalCard.propTypes = {
  engagementImage: PropTypes.string,
  engagementId: PropTypes.string,
  engagementTitle: PropTypes.string,
};

export default EngagementHorizontalCard;

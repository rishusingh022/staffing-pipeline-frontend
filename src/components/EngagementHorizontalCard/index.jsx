import React from 'react';
import './EngagementHorizontalCard.css';
import ProjectImage from '../../assets/images/engagement-default.png';
import PropTypes from 'prop-types';
import { AiFillCheckCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';

function EngagementHorizontalCard({
  engagementImage,
  engagementId,
  engagementTitle,
  knowMore,
  selectedEngagement,
  setSelectedEngagement,
}) {
  const navigate = useNavigate();
  // const [isSelected, setIsSelected] = useState(false);
  const handleViewMore = () => {
    navigate(`/projects/${engagementId}`);
  };
  const handleSelect = () => {
    setSelectedEngagement(engagementId);
  };
  return (
    <div className="engagement-card-container">
      <img className="engagement-img" src={engagementImage ? engagementImage : ProjectImage}></img>
      <div className="engagement-details">
        {/* <p className="engagement-id">{engagementId}</p> */}
        <p className="engagement-title">{engagementTitle}</p>
        <div className="engagement-bottom-btn" onClick={knowMore ? handleViewMore : handleSelect}>
          {knowMore ? (
            <div className="hover:text-blue-800">
              <p>View</p>
              <BsArrowRight size={20} />
            </div>
          ) : (
            <div>
              <AiFillCheckCircle color={selectedEngagement === engagementId ? 'green' : 'gray'} size={20} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

EngagementHorizontalCard.propTypes = {
  engagementImage: PropTypes.string,
  engagementId: PropTypes.string,
  engagementTitle: PropTypes.string,
  knowMore: PropTypes.bool,
  selectedEngagement: PropTypes.string,
  setSelectedEngagement: PropTypes.func,
};

export default EngagementHorizontalCard;

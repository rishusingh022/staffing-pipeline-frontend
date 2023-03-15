import React from 'react';
import './PeopleHorizontalCard.css';
import ArrowIcon from '../../assets/images/Vector.png';
import UserImage from '../../assets/images/user-default.png';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function PeopleHorizontalCard({ userImage, userFMNO, userName, userPosition, userOffice, userId }) {
  const navigate = useNavigate();
  const handleKnowMore = () => {
    navigate(`/users/${userId}`);
  };
  return (
    <div className="user-horizontal-card-container">
      <div className="user-horizontal-img-container">
        <img className="user-horizontal-img" src={userImage ? userImage : UserImage}></img>
      </div>
      <div className="user-horizontal-details">
        <p className="user-horizontal-id">FMNO: {userFMNO}</p>
        <p className="user-horizontal-name">{userName}</p>
        <p className="user-horizontal-position">{userPosition}</p>
        <p className="user-horizontal-office">{userOffice}</p>
        <div className="user-horizontal-bottom-btn" onClick={handleKnowMore}>
          <div>
            <p>Know More</p>
            <img src={ArrowIcon}></img>
          </div>
        </div>
      </div>
    </div>
  );
}

PeopleHorizontalCard.propTypes = {
  userImage: PropTypes.string,
  userFMNO: PropTypes.string,
  userName: PropTypes.string,
  userPosition: PropTypes.string,
  userOffice: PropTypes.string,
  userId: PropTypes.string,
};

export default PeopleHorizontalCard;

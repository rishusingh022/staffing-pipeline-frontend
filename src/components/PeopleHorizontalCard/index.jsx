import React from 'react';
import './PeopleHorizontalCard.css';
import { BsArrowRight } from 'react-icons/bs';
import { AiFillCheckCircle } from 'react-icons/ai';
import UserImage from '../../assets/images/user-default.png';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import capitalizeFirstLetter from '../../utils/common/stringUtil';

function PeopleHorizontalCard({
  userImage,
  userFMNO,
  userName,
  userPosition,
  userOffice,
  userId,
  knowMore,
  selectedUsers,
  setSelectedUsers,
  selected,
}) {
  const navigate = useNavigate();
  // const [isSelected, setIsSelected] = useState(false);
  const handleSelect = () => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(prev => {
        return prev.filter(uid => uid !== userId);
      });
    } else {
      setSelectedUsers(prev => {
        return [...prev, userId];
      });
    }
  };
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
        <p className="user-horizontal-position">{capitalizeFirstLetter(userPosition)}</p>
        <p className="user-horizontal-office">{userOffice}</p>
        <div className="user-horizontal-bottom-btn" onClick={knowMore ? handleKnowMore : handleSelect}>
          {knowMore ? (
            <div className="hover:text-blue-800">
              <p>Know More</p>
              <BsArrowRight />
            </div>
          ) : (
            <div>
              <AiFillCheckCircle color={selected ? 'green' : 'gray'} size={20} />
            </div>
          )}
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
  knowMore: PropTypes.bool,
  selectedUsers: PropTypes.array,
  setSelectedUsers: PropTypes.func,
  selected: PropTypes.bool,
};

export default PeopleHorizontalCard;

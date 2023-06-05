import React from 'react';
import Image from '../Image';
import './UserCard.css';
import { BsArrowRight } from 'react-icons/bs';
import PropTypes from 'prop-types';
import UserDefault from '../../assets/images/user-default.png';
import capitalizeFirstLetter from '../../utils/common/stringUtil';

export default function UserCard({
  imageUrl,
  altText,
  name,
  designation,
  location,
  handleButtonClick,
}) {
  return (
    <div className="bg-white shadow-lg flex flex-col w-56 user-card-style" data-testid="image-card">
      <Image imageUrl={imageUrl ? imageUrl : UserDefault} altText={altText} />
      <div className="bg-white px-3 py-2">
        <div className="text-xs mb-1 text-white">-</div>
        <div className="font-bold text-xl mb-1 user-card-name">{name}</div>
        <div className="font-semibold text-xs mb-1">
          {designation.length > 2 ? capitalizeFirstLetter(designation) : designation.toUpperCase()}
        </div>
        <div className="font-medium text-xs mb-1 text-gray-500">{location}</div>
      </div>
      <div
        className="bg-white link-button self-end text-xs mb-2 font-medium cursor-pointer hover:text-blue-800"
        onClick={handleButtonClick}>
        Know More
        <BsArrowRight className="inline-block mx-2" />
      </div>
    </div>
  );
}

UserCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  identityNumber: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  designation: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
};

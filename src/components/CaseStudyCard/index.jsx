import React from 'react';
import Image from '../Image';
import './CaseStudyCard.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CircleImage from '../CircleImage';

export default function CaseStudyCard({ imageUrl, altText, name, collaborators, boxLink, engagementName }) {
  const images = collaborators?.map(collaborator => {
    return {
      url: collaborator.image,
      altText: collaborator.name,
    };
  });
  return (
    <div className="bg-white shadow-lg flex flex-col w-64 case-study-card-style" data-testid="image-card">
      <Image imageUrl={imageUrl} altText={altText} />
      <div className="px-3 py-1">
        <div className="font-bold text-xl mb-1 case-study-name">{name}</div>
        <div className="font-medium text-xs mb-1 text-gray-500">{engagementName}</div>
      </div>
      <Link
        to={boxLink}
        className="link-button self-end text-xs mb-2 font-medium cursor-pointer"
        target="_blank"></Link>
      <div className="ml-2">{collaborators && <CircleImage images={images} />}</div>
    </div>
  );
}

CaseStudyCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  boxLink: PropTypes.string.isRequired,
  engagementName: PropTypes.string.isRequired,
  collaborators: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ),
};

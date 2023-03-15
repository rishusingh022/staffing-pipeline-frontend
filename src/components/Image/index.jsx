import React from 'react';
import './image.css';
import PropTypes from 'prop-types';

export default function Image({ imageUrl, altText, hasOverlay }) {
  return (
    <>
      {hasOverlay ? (
        <>
          <div className="container">
            <img src={imageUrl} alt={altText} className="overlay-image-component" />
            <div className="overlay">+</div>
          </div>
        </>
      ) : (
        <img src={imageUrl} alt={altText} className="image-component" />
      )}
    </>
  );
}

Image.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  hasOverlay: PropTypes.bool,
};

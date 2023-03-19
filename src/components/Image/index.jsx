import React from 'react';
import './image.css';
import PropTypes from 'prop-types';
import { FiDownload } from 'react-icons/fi';
import { MdInsertLink } from 'react-icons/md';

export default function Image({ imageUrl, altText, hasOverlay, caseStudyOverlay }) {
  return (
    <>
      {hasOverlay ? (
        <>
          <div className="container">
            <img src={imageUrl} alt={altText} className="overlay-image-component" />
            <div className="overlay">+</div>
          </div>
        </>
      ) : caseStudyOverlay ? (
        <>
          <div className="container">
            <img src={imageUrl} alt={altText} className="overlay-image-component" />
            <div className="overlay">
              <div>
                <MdInsertLink size={45} />
              </div>
              <div>
                <FiDownload size={40} />
              </div>
            </div>
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
  caseStudyOverlay: PropTypes.bool,
};

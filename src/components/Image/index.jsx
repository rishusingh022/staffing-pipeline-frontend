import React from 'react';
import './image.css';
import PropTypes from 'prop-types';
import { FiDownload } from 'react-icons/fi';
import { MdInsertLink } from 'react-icons/md';

export default function Image({ imageUrl, altText, hasOverlay, caseStudyOverlay, handleImageSelect = () => {} }) {
  return (
    <>
      {hasOverlay ? (
        <>
          <label htmlFor="upload-image">
            <div className="container">
              <img src={imageUrl} alt={altText} className="overlay-image-component" />
              <div className="overlay">+</div>
            </div>
          </label>
          <input type={'file'} className="hidden" id="upload-image" onChange={handleImageSelect}></input>
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
        <img src={imageUrl} alt={altText} className="image-component bg-gray-200" />
      )}
    </>
  );
}

Image.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  hasOverlay: PropTypes.bool,
  caseStudyOverlay: PropTypes.bool,
  handleImageSelect: PropTypes.func,
};

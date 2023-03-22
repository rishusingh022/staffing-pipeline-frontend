import React from 'react';
import PropTypes from 'prop-types';
import './CircleImage.css';

export default function CircleImage({ images }) {
  // const imageLength = images.length;
  return (
    <div className="flex items-center">
      <div className="flex gap-1 case-study-collaborators max-w-[94px]">
        {images.map(image => (
          <>
            <img src={image.url} alt={image.altText} key={image.url} className="w-5 h-5 rounded-full object-cover" />
          </>
        ))}
      </div>
      {images.length > 4 && (
        <span className="text-xs text-gray-400 ml-1 rounded-border-container flex-shrink-0 aspect-square flex items-center">{`+${
          images.length - 4
        }`}</span>
      )}
    </div>
  );
}

CircleImage.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      altText: PropTypes.string.isRequired,
    })
  ),
};

import React from 'react';
import PropTypes from 'prop-types';

function PageLoader(props) {
  return (
    <div className={`pt-32 w-full flex justify-center ${props.extraClass && props.extraClass}`}>
      <div className="w-10 aspect-square border-4 border-gray-200 border-t-4 border-t-gray-500 rounded-full animate-spin"></div>
    </div>
  );
}

PageLoader.propTypes = {
  extraClass: PropTypes.string,
};

export default PageLoader;

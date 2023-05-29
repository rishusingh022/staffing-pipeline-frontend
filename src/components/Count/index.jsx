import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import makeRequest from '../../utils/makeRequest';
import { GET_ENGAGEMENT_COUNT, GET_USER_COUNT, GET_CASE_STUDY_COUNT } from '../../constants/apiEndpoints';
import PropTypes from 'prop-types';
const capitalize = s => {
  if (typeof s !== 'string') return '';
  const words = s.split('-');
  const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
  return capitalizedWords.join(' ');
};

function Count({ type, setObjectCount, objectCount, searchCount }) {
  const navigate = useNavigate();
  const getCount = () => {
    if (type === 'engagements') {
      makeRequest(GET_ENGAGEMENT_COUNT, {}, navigate).then(response => {
        setObjectCount(response);
      });
    }
    if (type === 'users') {
      makeRequest(GET_USER_COUNT, {}, navigate).then(response => {
        setObjectCount(response);
      });
    }
    if (type === 'case-studies') {
      makeRequest(GET_CASE_STUDY_COUNT, {}, navigate).then(response => {
        setObjectCount(response);
      });
    }
  };
  useEffect(() => {
    getCount();
  }, []);
  console.log('objectCount', objectCount);
  return (
    <div
      style={{ marginRight: type !== 'case-studies' ? '32%' : '24%' }}
      className="w-full px-10 flex justify-end py-4 text-gray-400">
      <p>
        {searchCount} {capitalize(type)}
      </p>
    </div>
  );
}

Count.propTypes = {
  type: PropTypes.string.isRequired,
  setObjectCount: PropTypes.func.isRequired,
  objectCount: PropTypes.number.isRequired,
  searchCount: PropTypes.number.isRequired,
};

export default Count;

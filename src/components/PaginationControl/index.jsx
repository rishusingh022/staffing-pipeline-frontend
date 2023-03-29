import React from 'react';
import PropTypes from 'prop-types';
import { PAGE_LIMIT } from '../../constants/page';
import { GrFormNextLink } from 'react-icons/gr';
import { GrFormPreviousLink } from 'react-icons/gr';

function PaginationControl({ pageNumber, setPageNumber, objectCount }) {
  const pageCount = Math.ceil(objectCount / PAGE_LIMIT);
  const inputRef = React.useRef(null);
  const goNext = () => {
    if (pageNumber >= pageCount) return;
    inputRef.current.value = Number(pageNumber) + 1;
    setPageNumber(prev => Number(prev) + 1);
  };
  const goPrev = () => {
    if (pageNumber > 1) {
      inputRef.current.value = Number(pageNumber) - 1;
      setPageNumber(prev => Number(prev) - 1);
    } else {
      setPageNumber(1);
    }
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      const value = Number(event.target.value);
      handleChange(value);
    }
  };

  const handleChange = value => {
    if (value > pageCount) {
      setPageNumber(pageCount);
      inputRef.current.value = pageCount;
    } else if (value < 1) {
      setPageNumber(1);
      inputRef.current.value = 1;
    } else {
      setPageNumber(value);
      inputRef.current.value = Number(value);
    }
  };

  return (
    <div className="relative min-h-[50px] py-4 flex w-full px-10 justify-center">
      <div className="flex gap-12 items-center justify-center">
        <GrFormPreviousLink className="hover:cursor-pointer" onClick={goPrev} size={24} />
        <input
          className="bg-gray-200 border p-1 w-12 text-center rounded-md text-sm "
          defaultValue={pageNumber ? pageNumber : 1}
          type="number"
          ref={inputRef}
          onKeyDown={handleKeyDown}
          onBlur={e => handleChange(e.target.value)}
        />
        <GrFormNextLink className="hover:cursor-pointer" onClick={goNext} size={24} />
      </div>
    </div>
  );
}

PaginationControl.propTypes = {
  type: PropTypes.string,
  pageNumber: PropTypes.number,
  setPageNumber: PropTypes.func,
  count: PropTypes.number,
  objectCount: PropTypes.number,
  setObjectCount: PropTypes.func,
};

export default PaginationControl;

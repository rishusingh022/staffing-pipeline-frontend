import React, { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { Modal } from '..';
import PropTypes from 'prop-types';
import makeRequest from '../../utils/makeRequest';
import { GET_DATA_BY_SEARCH_URL } from '../../constants/apiEndpoints';
import { skills } from '../../constants/skills';
import { useNavigate } from 'react-router-dom';

const SearchAndAdd = ({ setIsOpen, entity, handleItem }) => {
  const [mactchQueries, setMatchQueries] = useState([]);
  const [input, setInput] = useState('');
  const [debouncedInput] = useDebounce(input, 1000);
  const navigate = useNavigate();

  useEffect(() => {
    handleSearch(debouncedInput);
  }, [debouncedInput]);

  const handleSearch = async searchValue => {
    if (searchValue === '') {
      setMatchQueries([]);
      return;
    }
    // data fetch
    try {
      if (entity === 'skills') {
        const result = skills;
        const filteredResult = result.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()));
        setMatchQueries(filteredResult);
        return;
      }
      const result = await makeRequest(GET_DATA_BY_SEARCH_URL(entity, searchValue), {}, navigate);
      setMatchQueries(result);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAdd = e => {
    const id = e.target.getAttribute('data-id');
    const item = mactchQueries.find(item => item.id == id);
    handleItem(item);
    setIsOpen(false);
  };

  return (
    <div>
      <Modal setIsOpen={setIsOpen}>
        <div>
          <input
            className="w-full h-[48px] border-2 border-gray-400 focus:outline-none focus:border-electricBlue p-2 my-2 mb-0"
            type="text"
            value={input}
            placeholder={`Search ${entity}`}
            onChange={e => setInput(e.target.value)}
          />
        </div>
        {mactchQueries.length != 0 && (
          <div className="my-2 mx-1 mt-0 bg-white divide-y border border-t-0 rounded-sm">
            {mactchQueries.map(item => {
              return (
                <div className="p-3 cursor-pointer hover:bg-gray-100" key={item.id} onClick={e => handleAdd(e)}>
                  <div className=" mx-1" data-id={item.id}>
                    {item.name}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Modal>
    </div>
  );
};

SearchAndAdd.propTypes = {
  entity: PropTypes.string,
  navigate: PropTypes.func,
  handleItem: PropTypes.func,
  setIsOpen: PropTypes.func,
};

export default SearchAndAdd;

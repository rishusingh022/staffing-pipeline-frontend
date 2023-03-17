import React, { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { Modal } from '..';

const mockList = [
  {
    id: 1,
    name: 'John Doe',
    fmno: '123456',
  },
  {
    id: 2,
    name: 'Jane Doe',
    fmno: '123455',
  },
  {
    id: 3,
    name: 'Kyle Joe',
    fmno: '123454',
  },
];

const SearchAndAdd = () => {
  const [mactchQueries, setMatchQueries] = useState([]);
  const [input, setInput] = useState('');
  const [debouncedInput] = useDebounce(input, 1000);

  useEffect(() => {
    handleSearch(debouncedInput);
  }, [debouncedInput]);

  const handleSearch = async searchValue => {
    console.log(searchValue);
    if (searchValue === '') {
      setMatchQueries([]);
      return;
    }
    console.log(mockList);
    const result = mockList.filter(item => {
      return item.name.toUpperCase().match(searchValue.toUpperCase());
    });
    console.log(result);
    setMatchQueries(result);
  };
  // Subject to change according to the API
  const handleAdd = e => {
    // console.log(e.target.getAttribute('data-id'));
    const id = e.target.getAttribute('data-id');
    console.log(id);
  };

  return (
    <div>
      <Modal open={true}>
        <div>
          <input
            className="w-full h-[48px] border-2 border-gray-400 focus:outline-none focus:border-electricBlue p-2 my-2 mb-0"
            type="text"
            value={input}
            placeholder="Search"
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

export default SearchAndAdd;

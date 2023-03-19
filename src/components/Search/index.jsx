import React from 'react';
import './Search.css';
import Button from '../Button/index';
import prop from 'prop-types';
function Search({ placeHolderValue, handleSearch }) {
  const [searchValue, setSearchValue] = React.useState('');

  const handleSearchChange = event => {
    event.preventDefault();
    setSearchValue(() => event.target.value);
    handleSearch(event.target.value);
  };
  const handleSearchClick = () => {
    handleSearch(searchValue);
    setSearchValue(() => '');
  };

  return (
    <div className="search-container">
      <input onChange={handleSearchChange} type="text" placeholder={placeHolderValue} />
      <div className="filter-search-button">
        <Button buttonText="Search" handleClick={handleSearchClick} />
      </div>
    </div>
  );
}

export default Search;

Search.propTypes = {
  handleSearch: prop.func.isRequired,
  placeHolderValue: prop.string.isRequired,
};

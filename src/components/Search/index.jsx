import React from 'react';
import './Search.css';
import Button from '../Button/index';
import prop from 'prop-types';
function Search({ handleSearch }) {
  const [searchValue, setSearchValue] = React.useState('');

  const handleSearchChange = event => {
    setSearchValue(event.target.value);
  };
  const handleSearchClick = () => {
    handleSearch(searchValue);
  };

  return (
    <div className="search-container">
      <input onChange={handleSearchChange} type="text" placeholder="Search for Studies, tech stack, etc" />
      <div className="filter-search-button">
        <Button buttonText="Search" handleClick={handleSearchClick} />
      </div>
    </div>
  );
}

export default Search;

Search.propTypes = {
  handleSearch: prop.func.isRequired,
};

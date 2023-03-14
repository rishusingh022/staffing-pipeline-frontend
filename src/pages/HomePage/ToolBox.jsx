import React from 'react';
import './HomePage.css';
import Dropdown from '../../components/Dropdown';
import { Search } from '../../components';
import { timeFrameOptions, guildOptions, technologyOptions } from '../../mocks/DropDownOptions';
function ToolBox() {
  const handleSearch = searchValue => {
    console.log(searchValue);
  };
  return (
    <div className="filter-container">
      <div className="fiter-search-box">
        <div className="filter-input-box">
          <Search placeHolderValue={'Search for studies, tech stack, etc.'} handleSearch={handleSearch} />
        </div>
      </div>
      <div className="filter-drop-downs">
        <Dropdown dropdownName={'Time Frame'} dropdownData={timeFrameOptions} selectOption={() => {}} />
        <Dropdown dropdownName={'Guilds'} dropdownData={guildOptions} selectOption={() => {}} />
        <Dropdown dropdownName={'Technology'} dropdownData={technologyOptions} selectOption={() => {}} />
      </div>
    </div>
  );
}

export default ToolBox;

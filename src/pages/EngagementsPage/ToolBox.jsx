import React from 'react';
import './EngagementsPage.css';
import Dropdown from '../../components/Dropdown';
import { Search } from '../../components';
import Button from '../../components/Button';
import { timeFrameOptions, guildOptions, technologyOptions } from '../../mocks/DropDownOptions';
function ToolBox() {
  const handleSearch = searchValue => {
    console.log(searchValue);
  };
  const handleAddNewEngagement = () => {
    console.log('Add new engagement');
  };
  return (
    <div className="filter-container">
      <div className="fiter-search-box">
        <div className="filter-input-box">
          <Search placeHolderValue={'Search for studies'} handleSearch={handleSearch} />
        </div>
      </div>
      <div className="filter-drop-downs">
        <Dropdown dropdownName={'Time Frame'} dropdownData={timeFrameOptions} selectOption={() => {}} />
        <Dropdown dropdownName={'Guilds'} dropdownData={guildOptions} selectOption={() => {}} />
        <Dropdown dropdownName={'Technology'} dropdownData={technologyOptions} selectOption={() => {}} />
        <Button buttonText={'Add new engagement'} handleClick={handleAddNewEngagement} />
      </div>
    </div>
  );
}

export default ToolBox;

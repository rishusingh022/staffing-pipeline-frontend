import React from 'react';
import Dropdown from '../../components/Dropdown';
import { Search } from '../../components';
import { technologyOptions, role } from '../../mocks/DropDownOptions';
import './PeoplePage.css';
import Button from '../../components/Button';
function ToolBox() {
  const handleSearch = searchValue => {
    console.log(searchValue);
  };
  const handleAddNewMember = () => {
    console.log('Add new member');
  };
  return (
    <div className="people-page-filter-container">
      <div className="people-page-filter-search-box">
        <div className="people-page-filter-input-box">
          <Search placeHolderValue={'Search for people'} handleSearch={handleSearch} />
        </div>
      </div>
      <div className="people-page-filter-drop-downs">
        <Dropdown dropdownName={'Technology'} dropdownData={technologyOptions} selectOption={() => {}} />
        <Dropdown dropdownName={'Role'} dropdownData={role} selectOption={() => {}} />
        <Button buttonText={'Add new member'} handleClick={handleAddNewMember} />
      </div>
      <div></div>
    </div>
  );
}

export default ToolBox;

import React from 'react';
import './CaseStudiesPage.css';
import Dropdown from '../../components/Dropdown';
import { Search } from '../../components';
import { timeFrameOptions, owner, study } from '../../mocks/DropDownOptions';
function ToolBox() {
  const handleSearch = searchValue => {
    console.log(searchValue);
  };
  return (
    <div className="case-study-page-filter-container">
      <div className="case-study-page-fiter-search-box">
        <div className="case-study-page-filter-input-box">
          <Search placeHolderValue={'Search for studies, tech stack, etc.'} handleSearch={handleSearch} />
        </div>
      </div>
      <div className="case-study-page-filter-drop-downs">
        <Dropdown dropdownName={'Time Frame'} dropdownData={timeFrameOptions} selectOption={() => {}} />
        <Dropdown dropdownName={'Owner'} dropdownData={owner} selectOption={() => {}} />
        <Dropdown dropdownName={'Study'} dropdownData={study} selectOption={() => {}} />
      </div>
    </div>
  );
}

export default ToolBox;

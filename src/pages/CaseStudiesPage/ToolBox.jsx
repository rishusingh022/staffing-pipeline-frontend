import React from 'react';
import './CaseStudiesPage.css';
import Dropdown from '../../components/Dropdown';
import { Search } from '../../components';
import { timeFrameOptions, study, collaborators } from '../../mocks/DropDownOptions';
import Button from '../../components/Button';

function ToolBox() {
  const handleSearch = searchValue => {
    console.log(searchValue);
  };
  const uploadExcel = () => {
    console.log('upload excel');
  };
  return (
    <div className="case-study-page-filter-container">
      <div className="case-study-page-filter-input-box">
        <Search placeHolderValue={'Search for case studies'} handleSearch={handleSearch} />
      </div>
      <div className="case-study-page-filter-drop-downs">
        <Dropdown dropdownName={'Time Frame'} dropdownData={timeFrameOptions} selectOption={() => {}} />
        <Dropdown dropdownName={'Collaborators'} dropdownData={collaborators} selectOption={() => {}} />
        <Dropdown dropdownName={'Study'} dropdownData={study} selectOption={() => {}} />
        <Button buttonText={'Upload Case Study'} handleClick={uploadExcel} />
      </div>
    </div>
  );
}

export default ToolBox;

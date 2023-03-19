import React from 'react';
import './CaseStudiesPage.css';
import Dropdown from '../../components/Dropdown';
import { Search } from '../../components';
import { timeFrameOptions } from '../../mocks/DropDownOptions';
import Button from '../../components/Button';
import PropTypes from 'prop-types';
function ToolBox({
  handleSearchChange,
  handleCollaboratorChange,
  handleStudyChange,
  handleTimeFrameChange,
  collaboratorOptions,
  studyOptions,
}) {
  const handleSearch = searchValue => {
    handleSearchChange(searchValue);
  };
  const selectCollaboratorOption = option => {
    handleCollaboratorChange(option);
  };
  const selectStudyOption = option => {
    handleStudyChange(option);
  };
  const selectTimeFrameOption = option => {
    handleTimeFrameChange(option);
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
        <Dropdown dropdownName={'Time Frame'} dropdownData={timeFrameOptions} selectOption={selectTimeFrameOption} />
        <Dropdown
          dropdownName={'Collaborators'}
          dropdownData={collaboratorOptions}
          selectOption={selectCollaboratorOption}
        />
        <Dropdown dropdownName={'Study'} dropdownData={studyOptions} selectOption={selectStudyOption} />
        <Button buttonText={'Upload Case Study'} handleClick={uploadExcel} />
      </div>
    </div>
  );
}

ToolBox.propTypes = {
  handleSearchChange: PropTypes.func.isRequired,
  handleCollaboratorChange: PropTypes.func.isRequired,
  handleStudyChange: PropTypes.func.isRequired,
  handleTimeFrameChange: PropTypes.func.isRequired,
  collaboratorOptions: PropTypes.array.isRequired,
  studyOptions: PropTypes.array.isRequired,
};

export default ToolBox;

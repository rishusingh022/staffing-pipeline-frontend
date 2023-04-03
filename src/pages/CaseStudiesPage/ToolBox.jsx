import React, { useState } from 'react';
import './CaseStudiesPage.css';
import Dropdown from '../../components/Dropdown';
import { Search } from '../../components';
import { timeFrameOptions } from '../../mocks/DropDownOptions';
import Button from '../../components/Button';
import PropTypes from 'prop-types';
import CaseStudyModal from '../../components/CaseStudyModal';
import { FeatureContext } from '../../context/FeatureContext';
import allFeatures from '../../constants/allFeatures';
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
    setIsOpen(true);
  };
  const { userInfo } = React.useContext(FeatureContext);

  const [isOpen, setIsOpen] = useState(false);
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
        {userInfo?.featureAccess.includes(allFeatures.create_case_study) && (
          <Button buttonText={'Upload Case Study'} handleClick={uploadExcel} />
        )}
      </div>
      {isOpen && <CaseStudyModal setIsOpen={setIsOpen} />}
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

import React from 'react';
import './EngagementsPage.css';
import Dropdown from '../../components/Dropdown';
import { Search } from '../../components';
import Button from '../../components/Button';
import PropTypes from 'prop-types';
import { timeFrameOptions } from '../../mocks/DropDownOptions';
import { FeatureContext } from '../../context/FeatureContext';
import allFeatures from '../../constants/allFeatures';
function ToolBox({
  guildOptions,
  technologyOptions,
  handleAddNewEngagement,
  handleTechnologyChange,
  handleGuildChange,
  handleTimeFrameChange,
  handleSearchChange,
}) {
  const handleSearch = searchValue => {
    handleSearchChange(searchValue);
  };
  const selectTechOption = option => {
    handleTechnologyChange(option);
  };
  const selectGuildOption = option => {
    handleGuildChange(option);
  };
  const selectTimeFrameOption = option => {
    handleTimeFrameChange(option);
  };
  const { userInfo } = React.useContext(FeatureContext);
  return (
    <div className="filter-container">
      <div className="fiter-search-box">
        <div className="filter-input-box">
          <Search placeHolderValue={'Search for engagements'} handleSearch={handleSearch} />
        </div>
      </div>
      <div className="filter-drop-downs">
        <Dropdown dropdownName={'Time Frame'} dropdownData={timeFrameOptions} selectOption={selectTimeFrameOption} />
        <Dropdown dropdownName={'Guilds'} dropdownData={guildOptions} selectOption={selectGuildOption} />
        <Dropdown dropdownName={'Technology'} dropdownData={technologyOptions} selectOption={selectTechOption} />
        {userInfo?.featureAccess?.includes(allFeatures.create_engagement) && (
          <Button buttonText={'Add new engagement'} handleClick={handleAddNewEngagement} />
        )}
      </div>
    </div>
  );
}
ToolBox.propTypes = {
  handleAddNewEngagement: PropTypes.func.isRequired,
  technologyOptions: PropTypes.array.isRequired,
  guildOptions: PropTypes.array.isRequired,
  handleTechnologyChange: PropTypes.func.isRequired,
  handleGuildChange: PropTypes.func.isRequired,
  handleTimeFrameChange: PropTypes.func.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
};
export default ToolBox;

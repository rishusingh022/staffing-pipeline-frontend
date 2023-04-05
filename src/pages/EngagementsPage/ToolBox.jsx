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
  sectorOptions,
  sectorSelected,
  handleAddNewEngagement,
  handleTechnologyChange,
  handleGuildChange,
  handleTimeFrameChange,
  handleSearchChange,
  handleSectorChange,
  handleSubSectorChange,
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
        <div className="flex flex-col gap-4">
          <Dropdown
            dropdownName={'Sector'}
            dropdownData={['All', ...sectorOptions.map(sector => sector.name)]}
            selectOption={handleSectorChange}
          />
          {sectorSelected?.sub_sectors?.length > 0 && (
            <Dropdown
              dropdownName={'Sub Sector'}
              dropdownData={['All', ...sectorSelected.sub_sectors.map(sector => sector.name)]}
              selectOption={handleSubSectorChange}
            />
          )}
        </div>
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
  sectorOptions: PropTypes.array.isRequired,
  sectorSelected: PropTypes.object.isRequired,
  handleTechnologyChange: PropTypes.func.isRequired,
  handleGuildChange: PropTypes.func.isRequired,
  handleTimeFrameChange: PropTypes.func.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
  handleSectorChange: PropTypes.func.isRequired,
  handleSubSectorChange: PropTypes.func.isRequired,
};
export default ToolBox;

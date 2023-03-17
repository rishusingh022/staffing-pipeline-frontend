import React from 'react';
import './EngagementsPage.css';
import Dropdown from '../../components/Dropdown';
import { Search } from '../../components';
import Button from '../../components/Button';
import PropTypes from 'prop-types';
import { timeFrameOptions, guildOptions, technologyOptions } from '../../mocks/DropDownOptions';
function ToolBox({ handleAddNewEngagement }) {
  const handleSearch = searchValue => {
    console.log(searchValue);
  };
  return (
    <div className="filter-container">
      <div className="fiter-search-box">
        <div className="filter-input-box">
          <Search placeHolderValue={'Search for engagements'} handleSearch={handleSearch} />
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
ToolBox.propTypes = {
  handleAddNewEngagement: PropTypes.func.isRequired,
};
export default ToolBox;

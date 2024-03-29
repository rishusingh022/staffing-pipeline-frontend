import React from 'react';
import Dropdown from '../../components/Dropdown';
import { Search } from '../../components';
import props from 'prop-types';
import './PeoplePage.css';
import Button from '../../components/Button';
import { FeatureContext } from '../../context/FeatureContext';
import allFeatures from '../../constants/allFeatures';

function ToolBox({
  handleSearchChange,
  handleTechnologyChange,
  handleRoleChange,
  technologyOptions,
  roleOptions,
  navigate,
}) {
  const { userInfo } = React.useContext(FeatureContext);

  const handleSearch = searchValue => {
    handleSearchChange(searchValue);
  };
  const selectTechOption = option => {
    handleTechnologyChange(option);
  };
  const selectRoleOption = option => {
    handleRoleChange(option);
  };
  const handleAddNewMember = () => {
    navigate('/users/add');
  };
  return (
    <div className="people-page-filter-container">
      <div className="people-page-filter-search-box">
        <div className="people-page-filter-input-box">
          <Search placeHolderValue={'Search for people'} handleSearch={handleSearch} />
        </div>
      </div>
      <div className="people-page-filter-drop-downs">
        <Dropdown dropdownName={'Skills'} dropdownData={technologyOptions} selectOption={selectTechOption} />
        <Dropdown dropdownName={'Role'} dropdownData={roleOptions} selectOption={selectRoleOption} />
        {userInfo?.featureAccess?.includes(allFeatures.create_user) && (
          <Button data-testid="add-new-member" buttonText={'Add new member'} handleClick={handleAddNewMember} />
        )}
      </div>
      <div></div>
    </div>
  );
}

ToolBox.propTypes = {
  handleSearchChange: props.func.isRequired,
  handleTechnologyChange: props.func.isRequired,
  handleRoleChange: props.func.isRequired,
  technologyOptions: props.array.isRequired,
  roleOptions: props.array.isRequired,
  navigate: props.func.isRequired,
};

export default ToolBox;

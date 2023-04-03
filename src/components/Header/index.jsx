/* eslint-disable no-unused-vars */
import { useNavigate } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import {
  CASE_STUDIES_ROUTE,
  DASHBOARD_ROUTE,
  PROJECTS_ROUTE,
  UPLOAD_EXCELL_ROUTE,
  USERS_ROUTE,
} from '../../constants/routes';
import logoImage from '../../assets/McK_Logo.png';
import { FeatureContext } from '../../context/FeatureContext';
import { useOktaAuth } from '@okta/okta-react';
import Button from '../Button';
import allFeatures from '../../constants/allFeatures';
export default function Header({ hasNav }) {
  const { oktaAuth } = useOktaAuth();
  const navigate = useNavigate();
  const { userInfo } = React.useContext(FeatureContext);
  const location = window.location.pathname;

  const handleLogout = async () => {
    oktaAuth.signOut('/login');
  };

  const activeClass = 'text-cyan border-b-[5px] border-b-cyan border-solid pt-0 pb-2.5 px-[5px]';
  const inactiveClass =
    'text-[white] hover:text-cyan hover:border-b-[5px] hover:border-b-cyan hover:border-solid pt-0 pb-[15px] hover:pb-2.5 px-[5px]';

  return (
    <div className="font-light lg:h-[88px] h-[120px] flex-shrink-0 text-white flex justify-center bg-deepBlue header-container relative items-center">
      <img
        alt="logo"
        src={logoImage}
        className="h-[70px] w-[155px] aspect-auto self-end pl-0 pt-0 pb-[5px] absolute xl:left-44 left-10 top-4"
      />
      <div className="h-full  flex box-border">
        {hasNav && (
          <div className="grid grid-cols-4 gap-10 items-end">
            {userInfo?.featureAccess.includes(allFeatures.read_engagement) && (
              <button
                className={location === PROJECTS_ROUTE ? activeClass : inactiveClass}
                onClick={() => navigate(PROJECTS_ROUTE)}>
                Engagements
              </button>
            )}
            <button
              className={location === USERS_ROUTE ? activeClass : inactiveClass}
              onClick={() => navigate(USERS_ROUTE)}>
              People
            </button>
            <button
              className={location === CASE_STUDIES_ROUTE ? activeClass : inactiveClass}
              onClick={() => navigate(CASE_STUDIES_ROUTE)}>
              Case Studies
            </button>
            {userInfo?.featureAccess.includes(allFeatures.upload_excel) && (
              <button
                className={location === UPLOAD_EXCELL_ROUTE ? activeClass : inactiveClass}
                onClick={() => navigate(UPLOAD_EXCELL_ROUTE)}>
                Upload Excel
              </button>
            )}
            {userInfo?.featureAccess.includes(allFeatures.read_metrics) && (
              <button
                className={location === DASHBOARD_ROUTE ? activeClass : inactiveClass}
                onClick={() => navigate(DASHBOARD_ROUTE)}>
                Dashboard
              </button>
            )}
          </div>
        )}
      </div>
      {hasNav && (
        <button
          className="absolute top-7 right-[5%] border-[1px] py-1 px-3 hover:text-cyan hover:border-cyan"
          onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  );
}

Header.propTypes = {
  hasNav: PropTypes.bool.isRequired,
};

import { useNavigate } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import { CASE_STUDIES_ROUTE, PROJECTS_ROUTE, UPLOAD_EXCELL_ROUTE, USERS_ROUTE } from '../../constants/routes';
import logoImage from '../../assets/McK_Logo.png';
import Button from '../Button';
export default function Header({ hasNav }) {
  const navigate = useNavigate();
  const location = window.location.pathname;

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const activeClass = 'text-cyan border-b-[5px] border-b-cyan border-solid pt-0 pb-2.5 px-[5px]';
  const inactiveClass =
    'text-[white] hover:text-cyan hover:border-b-[5px] hover:border-b-cyan hover:border-solid pt-0 pb-[15px] hover:pb-2.5 px-[5px]';

  return (
    <div className="font-light h-[120px] text-white flex justify-center bg-deepBlue header-container relative items-center">
      <img src={logoImage} className="h-[70px] w-[155px] aspect-auto self-end pl-0 pt-0 pb-[5px] absolute left-44" />
      <div className="h-full  flex box-border">
        {hasNav && (
          <div className="grid grid-cols-4 gap-10 items-end">
            <button
              className={location === PROJECTS_ROUTE ? activeClass : inactiveClass}
              onClick={() => navigate(PROJECTS_ROUTE)}>
              Engagements
            </button>
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
            <button
              className={location === UPLOAD_EXCELL_ROUTE ? activeClass : inactiveClass}
              onClick={() => navigate(UPLOAD_EXCELL_ROUTE)}>
              Upload Excel
            </button>
          </div>
        )}
      </div>
      {hasNav && (
        <button
          className="absolute right-[5%] border-[1px] py-1 px-3 hover:text-cyan hover:border-cyan"
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

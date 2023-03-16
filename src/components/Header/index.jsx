import React from 'react';
import PropTypes from 'prop-types';
import { CASE_STUDIES_ROUTE, PROJECTS_ROUTE, USERS_ROUTE } from '../../constants/routes';
import { useNavigate } from 'react-router-dom';

export default function Header({ hasNav }) {
  const navigate = useNavigate();
  const location = window.location.pathname;

  const activeClass = 'text-cyan border-b-[5px] border-b-cyan border-solid pt-0 pb-2.5 px-[5px]';
  const inactiveClass =
    'text-[white] hover:text-cyan hover:border-b-[5px] hover:border-b-cyan hover:border-solid pt-0 pb-[15px] hover:pb-2.5 px-[5px]';

  return (
    <div className="font-light h-[88px] text-white flex justify-center bg-deepBlue header-container">
      <div className="h-full xl:w-[63vw] lg:[70vw] md:[80vw] flex box-border">
        <img
          src="./assets/McK_Logo.png"
          className="h-[70px] w-[155px] aspect-auto self-end pl-0 lg:mr-[180px] sm:mr-[90px] pt-0 pb-[5px]"
        />
        {hasNav && (
          <div className="grid grid-cols-3 gap-10 items-end">
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
          </div>
        )}
      </div>
    </div>
  );
}

Header.propTypes = {
  hasNav: PropTypes.bool.isRequired,
};

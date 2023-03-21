import React from 'react';
import './footer.css';
import mckinseyLogo from '../../assets/logo/mckinsey-logo.png';
const Footer = () => {
  return (
    <div className="h-[120px] bottom-0 flex items-center">
      <img
        className="absolute left-10 sm:left-44 h-[54px] w-[155px] aspect-autolg:mr-[180px] sm:mr-[90px]"
        src={mckinseyLogo}
        alt="McKinsey and Company"
      />
    </div>
  );
};
export default Footer;

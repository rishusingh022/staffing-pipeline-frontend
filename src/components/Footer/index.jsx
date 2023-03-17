import React from 'react';
import './footer.css';
import mckinseyLogo from '../../assets/logo/mckinsey-logo.png';
const Footer = () => {
  return (
    <div className="footer">
      <img
        className="h-[70px] w-[155px] aspect-auto self-end pl-0 lg:mr-[180px] sm:mr-[90px] pt-0 pb-[5px]"
        src={mckinseyLogo}
        alt="McKinsey and Company"
      />
    </div>
  );
};
export default Footer;

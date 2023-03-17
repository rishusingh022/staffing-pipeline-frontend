import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ children, open }) => {
  const [isOpen, setIsOpen] = React.useState(open);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    isOpen && (
      <div className="z-10 fixed inset-0 flex justify-center items-center">
        <div className="absolute inset-0 bg-black/[.85]"></div>
        <div className="relative z-1 bg-white p-10 w-[40rem] h-[9rem]">
          <div
            className="absolute top-3 right-3 bg-transparent border-none cursor-pointer w-4 h-4 flex justify-center items-center"
            onClick={handleClose}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
          {children}
        </div>
      </div>
    )
  );
};
Modal.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
};

export default Modal;

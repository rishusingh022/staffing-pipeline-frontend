import React, { createContext, useState } from 'react';
import { PropTypes } from 'prop-types';

export const RoleContext = createContext();

export function RoleProvider({ children }) {
  const [userInfo, setUserInfo] = useState({});

  return <RoleContext.Provider value={{ userInfo, setUserInfo }}>{children}</RoleContext.Provider>;
}
RoleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

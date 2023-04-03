import React, { createContext, useState } from 'react';
import { PropTypes } from 'prop-types';

export const FeatureContext = createContext();

export function FeatureProvider({ children }) {
  const [userInfo, setUserInfo] = useState({
    featureAccess: [],
  });

  return <FeatureContext.Provider value={{ userInfo, setUserInfo }}>{children}</FeatureContext.Provider>;
}
FeatureProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

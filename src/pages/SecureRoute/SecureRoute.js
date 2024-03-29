import { useOktaAuth } from '@okta/okta-react';
import { useEffect } from 'react';
import { toRelativeUrl } from '@okta/okta-auth-js';
import { Outlet, useNavigate } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import makeRequest from '../../utils/makeRequest';
import { GET_USER_ROLE_URL } from '../../constants/apiEndpoints';
import { FeatureContext } from '../../context/FeatureContext';
export default function SecureRoute() {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(true);

  const { oktaAuth, authState } = useOktaAuth();

  axios.defaults.headers.common['Authorization'] = authState?.accessToken?.accessToken;

  const { setUserInfo } = React.useContext(FeatureContext);

  useEffect(() => {
    if (authState?.isAuthenticated === false) {
      const originalUri = toRelativeUrl(globalThis.location.href, globalThis.location.origin);
      oktaAuth.setOriginalUri(originalUri);
      oktaAuth.signInWithRedirect();
    } else if (authState?.isAuthenticated === true) {
      makeRequest(GET_USER_ROLE_URL, {}, navigate).then(data => {
        setLoading(false);
        setUserInfo(data);
        console.log('data', data);
      });
    }
  }, [oktaAuth, authState?.isAuthenticated]);

  return authState?.isAuthenticated && !loading ? <Outlet /> : <Spinner />;
}

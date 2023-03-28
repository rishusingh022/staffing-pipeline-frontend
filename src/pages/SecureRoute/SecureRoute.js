import { useOktaAuth } from '@okta/okta-react';
import { useEffect } from 'react';
import { toRelativeUrl } from '@okta/okta-auth-js';
import { Outlet, useNavigate } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import makeRequest from '../../utils/makeRequest';
import { GET_USER_ROLE_URL } from '../../constants/apiEndpoints';
import { RoleContext } from '../../context/RoleContext';
export default function SecureRoute() {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  const { oktaAuth, authState } = useOktaAuth();

  axios.defaults.headers.common['Authorization'] = authState?.accessToken?.accessToken;

  const { setUserInfo } = React.useContext(RoleContext);

  useEffect(() => {
    if (authState?.isAuthenticated === false) {
      const originalUri = toRelativeUrl(globalThis.location.href, globalThis.location.origin);
      oktaAuth.setOriginalUri(originalUri);
      oktaAuth.signInWithRedirect();
    } else if (authState?.isAuthenticated === true) {
      makeRequest(GET_USER_ROLE_URL, {}, navigate).then(data => {
        setUserInfo(data);
        if (data?.role === 'pd') navigate('/upload');
        else if (data?.role === 'leadership') navigate('/projects');
        else navigate('/users');
      });
    }
  }, [oktaAuth, authState?.isAuthenticated]);

  return authState?.isAuthenticated ? <Outlet /> : <Spinner />;
}

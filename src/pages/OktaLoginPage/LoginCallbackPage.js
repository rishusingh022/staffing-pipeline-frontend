/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { useOktaAuth, LoginCallback } from '@okta/okta-react';
import { useNavigate } from 'react-router-dom';
import { RoleContext } from '../../context/RoleContext';
import makeRequest from '../../utils/makeRequest';
import { GET_USER_ROLE_URL } from '../../constants/apiEndpoints';
import axios from 'axios';
export default function LoginCallbackPage() {
  const { userInfo } = useContext(RoleContext);
  const { authState } = useOktaAuth();
  axios.defaults.headers.common['Authorization'] = authState?.accessToken?.accessToken;
  const { setUserInfo } = React.useContext(RoleContext);
  const navigate = useNavigate();
  if (authState?.isAuthenticated) {
    makeRequest(GET_USER_ROLE_URL, {}, navigate).then(data => {
      console.log('data', data);
      setUserInfo(data);
      if (data?.role === 'pd') navigate('/upload');
      else if (data?.role === 'leadership') navigate('/dashboard');
      else navigate(`/users/${data.userId}`);
    });
  }
  return <LoginCallback />;
}

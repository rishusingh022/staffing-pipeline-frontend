/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { useOktaAuth, LoginCallback } from '@okta/okta-react';
import { useNavigate } from 'react-router-dom';
import { FeatureContext } from '../../context/FeatureContext';
import makeRequest from '../../utils/makeRequest';
import { GET_USER_ROLE_URL } from '../../constants/apiEndpoints';
import axios from 'axios';
import allFeatures from '../../constants/allFeatures';
export default function LoginCallbackPage() {
  const { authState } = useOktaAuth();
  axios.defaults.headers.common['Authorization'] = authState?.accessToken?.accessToken;
  const { setUserInfo } = React.useContext(FeatureContext);
  const navigate = useNavigate();
  if (authState?.isAuthenticated) {
    makeRequest(GET_USER_ROLE_URL, {}, navigate).then(data => {
      console.log('data', data);
      setUserInfo(data);
      if (data?.featureAccess.includes(allFeatures.upload_excel)) navigate('/upload');
      else if (data?.featureAccess.includes(allFeatures.read_metrics)) navigate('/dashboard');
      else navigate(`/casestudies`);
    });
  }
  return <LoginCallback />;
}

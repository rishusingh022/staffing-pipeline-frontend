import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import makeRequest from '../makeRequest';
import { GET_USER_ROLE_URL } from '../../constants/apiEndpoints';
import { useNavigate } from 'react-router-dom';
import { FeatureContext } from '../../context/FeatureContext';

export default function ProtectedRoute() {
  const navigate = useNavigate();
  const { setUserInfo } = React.useContext(FeatureContext);
  React.useEffect(() => {
    makeRequest(
      GET_USER_ROLE_URL,
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      },
      navigate
    ).then(data => setUserInfo(data));
  }, []);

  const token = localStorage.getItem('token');
  return token ? <Outlet /> : <Navigate to="/login" />;
}

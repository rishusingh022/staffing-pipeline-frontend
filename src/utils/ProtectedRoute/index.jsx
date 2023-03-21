import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import makeRequest from '../makeRequest';
import { GET_USER_ROLE_URL } from '../../constants/apiEndpoints';
import { useNavigate } from 'react-router-dom';
import { RoleContext } from '../../context/RoleContext';

export default function ProtectedRoute() {
  const navigate = useNavigate();
  const { setUserInfo } = React.useContext(RoleContext);
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

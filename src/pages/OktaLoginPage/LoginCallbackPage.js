import React, {useContext} from 'react';
import { useOktaAuth, LoginCallback } from '@okta/okta-react';
import { useNavigate } from 'react-router-dom';
import { RoleContext } from '../../context/RoleContext';

export default function LoginCallbackPage() {
  const { userInfo } = useContext(RoleContext);
  const { authState } = useOktaAuth();
  const navigate = useNavigate();
  if (authState?.isAuthenticated) {
    if(userInfo?.role === 'pd') navigate('/upload');
    else if(userInfo?.role === 'leadership') navigate('/projects');
    else navigate('/users');
  }
  return <LoginCallback />;
}

import React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import Spinner from '../../components/Spinner';

function Loggedin() {
  return (
    <div>
      <p>Logged in!</p>
    </div>
  );
}

function Login() {
  const { oktaAuth, authState } = useOktaAuth();

  const login = async () => oktaAuth.signInWithRedirect();

  if (!authState) {
    return <Spinner />;
  }

  if (!authState?.isAuthenticated) {
    login();
  }

  return <Loggedin />;
}

export default Login;

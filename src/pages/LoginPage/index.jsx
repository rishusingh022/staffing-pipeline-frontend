import * as React from 'react';
import './LoginPage.css';
import InputComponent from '../../components/InputComponent';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';

import makeRequest from '../../utils/authMakeRequest';
import { AUTH_LOGIN_URL } from '../../constants/apiEndpoints';
import { useNavigate } from 'react-router-dom';
import Notification from '../../components/Notification';

const LoginPage = () => {
  const [credentials, setCredentials] = React.useState({ email: '', password: '' });
  const [error, setError] = React.useState(false);
  const navigate = useNavigate();
  const handleCredentials = e => {
    setCredentials({ ...credentials, [e.target.placeholder]: e.target.value });
  };
  // const setUserRole = async () => {
  //   //
  //   makeRequest(
  //     GET_USER_ROLE_URL,
  //     {
  //       headers: {
  //         Authorization: localStorage.getItem('token'),
  //       },
  //     },
  //     navigate
  //   ).then(data => setUserInfo(data));
  // };
  const onSubmit = () => {
    makeRequest(AUTH_LOGIN_URL(), { data: credentials }, navigate)
      .then(async res => {
        localStorage.setItem('token', res.token);
        // await setUserRole();
        navigate('/');
      })
      .catch(err => {
        console.log(err.response);
        setError(true);
        console.log(err);
      });
  };
  setTimeout(() => (error ? setError(false) : null), 6000);
  return (
    <div className="login-page-container">
      <Header hasNav={false} />
      <div className="login-page">
        {error && <Notification message={'Invalid credentials'} handleClose={() => setError(false)} success={false} />}
        <div className={'card'}>
          <p className={'title'}>Hub Capablities and staffing portal</p>
          <InputComponent placeholder={'email'} type={'text'} handleChange={handleCredentials} />
          <InputComponent placeholder={'password'} type={'password'} handleChange={handleCredentials} />
          <Button buttonText={'Login'} handleClick={onSubmit} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;

import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../../components';
import './ErrorPage.css';

const ErrorPage = () => {
  const { errorCode } = useParams();

  if (errorCode === '400') {
    return (
      <>
        <Header hasNav />
        <div className="error-container">
          <p className="error-text">Bad request.</p>
        </div>
      </>
    );
  } else if (errorCode === '401') {
    return (
      <>
        <Header hasNav />
        <div className="error-container">
          <p className="error-text">You are not authorized to access this page.</p>
        </div>
      </>
    );
  } else if (errorCode === '403') {
    return (
      <>
        <Header hasNav />
        <div className="error-container">
          <p className="error-text">You do not have permission to access this page.</p>
        </div>
      </>
    );
  } else if (errorCode === '404') {
    return (
      <>
        <Header hasNav />
        <div className="error-container">
          <p className="error-text">The page you are looking for does not exist.</p>
        </div>
      </>
    );
  } else if (errorCode === '500') {
    return (
      <>
        <Header hasNav />
        <div className="error-container">
          <p className="error-text">Internal server error.</p>
        </div>
      </>
    );
  } else if (errorCode === '503') {
    return (
      <>
        <Header hasNav />
        <div className="error-container">
          <p className="error-text">The service you are trying to access is unavailable.</p>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Header hasNav />
        <div className="error-container">
          <p className="error-text">Something went wrong</p>
        </div>
      </>
    );
  }
};

export default ErrorPage;

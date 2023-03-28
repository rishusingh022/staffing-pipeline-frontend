/* eslint-disable no-undef */
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import CaseStudiesPage from './pages/CaseStudiesPage';
import EngagementDetailsPage from './pages/EngagementDetailsPage';
import EngagementsPage from './pages/EngagementsPage';
// import LoginPage from './pages/LoginPage';
import PeoplePage from './pages/PeoplePage';
import PeopleDetailsPage from './pages/PeopleDetailsPage';
import ErrorPage from './pages/ErrorPage';
import NotFoundPage from './pages/NotFoundPage';
import UpdateUserPage from './pages/UpdateUserPage';
import EditEngagementDetailsPage from './pages/EditEngagementDetailsPage';
import AddNewPeoplePage from './pages/AddNewPeoplePage';
import AddEngagementPage from './pages/AddEngagementPage';
import UploadExcelPage from './pages/UploadExcelPage';
// import ProtectedRoute from './utils/ProtectedRoute';
import { RoleProvider } from './context/RoleContext';
import LoginCallbackPage from './pages/OktaLoginPage/LoginCallbackPage';
import './App.css';
import {
  CASE_STUDIES_ROUTE,
  LOGIN_ROUTE,
  USERS_ROUTE,
  USER_DETAILS_ROUTE,
  UPDATE_USER_ROUTE,
  PROJECTS_ROUTE,
  PROJECT_DETAILS_ROUTE,
  ERROR_ROUTE,
  NOT_FOUND_ROUTE,
  PROJECT_DETAILS_EDIT_ROUTE,
  ADD_USER_ROUTE,
  ADD_PROJECT_ROUTE,
  UPLOAD_EXCELL_ROUTE,
  DEFAULT_ROUTE,
} from './constants/routes';

import { Security } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import Login from './pages/OktaLoginPage/Login';
import SecureRoute from './pages/SecureRoute/SecureRoute';

const oktaAuth = new OktaAuth({
  issuer: `https://${process.env.REACT_APP_OCTA_DOMAIN}/oauth2/default`,
  clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
  redirectUri: `${window.location.origin}/login/callback`,
});

function App() {
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  };
  return (
    <div className="app">
      <BrowserRouter>
        <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
          <RoleProvider>
            <Routes>
              <Route path={LOGIN_ROUTE} element={<Login />} />
              <Route exact path="/" element={<SecureRoute />}>
                <Route path={CASE_STUDIES_ROUTE} element={<CaseStudiesPage />} />
                <Route path={PROJECTS_ROUTE} element={<EngagementsPage />} />\
                <Route path={ADD_USER_ROUTE} element={<AddNewPeoplePage />} />
                <Route path={PROJECTS_ROUTE} element={<EngagementsPage />} />
                <Route path={ADD_PROJECT_ROUTE} element={<AddEngagementPage />} />
                <Route path={PROJECT_DETAILS_ROUTE} element={<EngagementDetailsPage />} />
                <Route path={PROJECT_DETAILS_EDIT_ROUTE} element={<EditEngagementDetailsPage />} />
                <Route path={USERS_ROUTE} element={<PeoplePage />} />
                <Route path={USER_DETAILS_ROUTE} element={<PeopleDetailsPage />} />
                <Route path={UPDATE_USER_ROUTE} element={<UpdateUserPage />} />
                <Route path={`${ERROR_ROUTE}/:errorCode?`} element={<ErrorPage />} />
                <Route path={UPLOAD_EXCELL_ROUTE} element={<UploadExcelPage />} />
                <Route path={NOT_FOUND_ROUTE} element={<NotFoundPage />} />
                <Route path={DEFAULT_ROUTE} element={<Navigate to={CASE_STUDIES_ROUTE} />} />
              </Route>
              <Route path="/login/callback" element={<LoginCallbackPage />} />
            </Routes>
          </RoleProvider>
        </Security>
      </BrowserRouter>
    </div>
  );
}

export default App;

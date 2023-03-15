import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import CaseStudiesPage from './pages/CaseStudiesPage';
import EngagementDetailsPage from './pages/EngagementDetailsPage';
import EngagementsPage from './pages/EngagementsPage';
import LoginPage from './pages/LoginPage';
import PeoplePage from './pages/PeoplePage';
import PeopleDetailsPage from './pages/PeopleDetailsPage';
import ErrorPage from './pages/ErrorPage';
import NotFoundPage from './pages/NotFoundPage';
import EditEngagementDetailsPage from './pages/EditEngagementDetailsPage';

import './App.css';
import {
  CASE_STUDIES_ROUTE,
  LOGIN_ROUTE,
  USERS_ROUTE,
  USER_DETAILS_ROUTE,
  PROJECTS_ROUTE,
  PROJECT_DETAILS_ROUTE,
  ERROR_ROUTE,
  NOT_FOUND_ROUTE,
  PROJECT_DETAILS_EDIT_ROUTE,
} from './constants/routes';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path={LOGIN_ROUTE} element={<LoginPage />} />
          <Route path={CASE_STUDIES_ROUTE} element={<CaseStudiesPage />} />
          <Route path={PROJECTS_ROUTE} element={<EngagementsPage />} />
          <Route path={PROJECT_DETAILS_ROUTE} element={<EngagementDetailsPage />} />
          <Route path={PROJECT_DETAILS_EDIT_ROUTE} element={<EditEngagementDetailsPage />} />
          <Route path={USERS_ROUTE} element={<PeoplePage />} />
          <Route path={USER_DETAILS_ROUTE} element={<PeopleDetailsPage />} />
          <Route path={`${ERROR_ROUTE}/:errorCode?`} element={<ErrorPage />} />
          <Route path={NOT_FOUND_ROUTE} element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

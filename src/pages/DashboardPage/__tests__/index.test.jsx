import React from 'react';
// eslint-disable-next-line no-unused-vars
import { render, screen } from '@testing-library/react';
import DashboardPage from '../index';
// eslint-disable-next-line no-unused-vars
import { Router } from 'react-router-dom';
import { FeatureProvider } from '../../../context/FeatureContext';
import makeRequest from '../../../utils/makeRequest';
// eslint-disable-next-line no-unused-vars
import { useNavigate } from 'react-router-dom';
// mock useNavigate
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));
// mock makeRequest
jest.mock('../../../utils/makeRequest', () => jest.fn());
jest.mock('react-router-dom');

jest.mock('@okta/okta-react', () => ({
  useOktaAuth: () => ({
    authState: {
      isAuthenticated: true,
      idToken: {
        claims: {
          email: '',
          name: '',
        },
      },
    },
  }),
}));
describe('Dashboard page', () => {
  it('should render correctly', () => {
    // return a promise
    makeRequest.mockResolvedValue([
      {
        status: 'ongoing',
      },
      {
        status: 'completed',
      },
      {
        status: 'upcoming',
      },
    ]);
    const { asFragment } = render(
      <FeatureProvider>
        <DashboardPage />
      </FeatureProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

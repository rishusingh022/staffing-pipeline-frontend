import React from 'react';
import LoginPage from '..';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { FeatureProvider } from '../../../context/FeatureContext';

jest.mock('@okta/okta-react', () => ({
  useOktaAuth: () => ({
    authState: {
      isAuthenticated: true,
    },
  }),
}));
describe('LoginPage Snapshot', () => {
  it('should render', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <FeatureProvider>
          <LoginPage />
        </FeatureProvider>
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

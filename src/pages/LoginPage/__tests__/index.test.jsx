import React from 'react';
import LoginPage from '..';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { RoleProvider } from '../../../context/RoleContext';

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
        <RoleProvider>
          <LoginPage />
        </RoleProvider>
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

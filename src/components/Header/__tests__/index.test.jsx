import React from 'react';
import { render } from '@testing-library/react';
import Header from '..';
import { RoleProvider } from '../../../context/RoleContext';

jest.mock('@okta/okta-react', () => ({
  useOktaAuth: () => ({
    authState: {
      isAuthenticated: true,
    },
  }),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => ({
    mockedNavigate: jest.fn(),
  }),
}));

describe('Header', () => {
  it('should render correctly with a navbar when Navbar boolean is true', () => {
    const { asFragment } = render(
      <RoleProvider>
        <Header {...{ hasNav: true }} />
      </RoleProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should render correctly without a navbar when Navbar boolean is false', () => {
    const { asFragment } = render(
      <RoleProvider>
        <Header {...{ hasNav: true }} />
      </RoleProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

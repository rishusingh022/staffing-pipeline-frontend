import { render } from '@testing-library/react';
import * as React from 'react';
import PeoplePage from '..';
import { RoleProvider } from '../../../context/RoleContext';

jest.mock('react-router-dom');
describe('PeoplePage', () => {
  it('should render without crashing', () => {
    const { asFragment } = render(
      <RoleProvider>
        <PeoplePage />
      </RoleProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

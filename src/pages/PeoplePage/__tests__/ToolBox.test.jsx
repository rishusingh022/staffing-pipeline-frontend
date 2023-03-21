import React from 'react';
import { render, screen } from '@testing-library/react';
import { RoleProvider } from '../../../context/RoleContext';

import ToolBox from '../ToolBox';

describe('ToolBox', () => {
  it('renders ToolBox component', () => {
    render(
      <RoleProvider>
        <ToolBox />
      </RoleProvider>
    );
    expect(screen.getByText('Technology')).toBeTruthy();
    expect(screen.getByText('Role')).toBeTruthy();
  });
  it('renders ToolBox component with search button', () => {
    render(
      <RoleProvider>
        <ToolBox />
      </RoleProvider>
    );
    expect(screen.getByText('Search')).toBeTruthy();
  });
  it('should show Technology drop down options when Technology drop down is clicked', () => {
    render(
      <RoleProvider>
        <ToolBox />
      </RoleProvider>
    );
    const technology = screen.getByText('Technology');
    technology.click();
  });
  it('should show Role drop down options when Role drop down is clicked', () => {
    render(
      <RoleProvider>
        <ToolBox />
      </RoleProvider>
    );
    const role = screen.getByText('Role');
    role.click();
  });
});

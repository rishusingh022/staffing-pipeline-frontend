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
    expect(screen.getByText('Time Frame')).toBeTruthy();
    expect(screen.getByText('Study')).toBeTruthy();
  });
  it('renders ToolBox component with search button', () => {
    render(
      <RoleProvider>
        <ToolBox />
      </RoleProvider>
    );
    expect(screen.getByText('Search')).toBeTruthy();
  });
  it('should show Time Frame drop down options when time frame drop down is clicked', () => {
    render(
      <RoleProvider>
        <ToolBox />
      </RoleProvider>
    );
    const timeFrame = screen.getByText('Time Frame');
    timeFrame.click();
    expect(screen.getByText('Today')).toBeTruthy();
    expect(screen.getByText('This week')).toBeTruthy();
    expect(screen.getByText('This month')).toBeTruthy();
  });
  it('should show collaborator drop down options when collaborator drop down is clicked', () => {
    render(
      <RoleProvider>
        <ToolBox />
      </RoleProvider>
    );
    const collaborators = screen.getByText('Collaborators');
    collaborators.click();
  });
  it('should show study drop down options when study drop down is clicked', () => {
    render(
      <RoleProvider>
        <ToolBox />
      </RoleProvider>
    );
    const study = screen.getByText('Study');
    study.click();
  });
});

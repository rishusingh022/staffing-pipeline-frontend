import React from 'react';
import { render, screen } from '@testing-library/react';

import ToolBox from '../ToolBox';

describe('ToolBox', () => {
  it('renders ToolBox component', () => {
    render(<ToolBox />);
    expect(screen.getByText('Time Frame')).toBeTruthy();
    expect(screen.getByText('Study')).toBeTruthy();
  });
  it('renders ToolBox component with search button', () => {
    render(<ToolBox />);
    expect(screen.getByText('Search')).toBeTruthy();
  });
  it('should show Time Frame drop down options when time frame drop down is clicked', () => {
    render(<ToolBox />);
    const timeFrame = screen.getByText('Time Frame');
    timeFrame.click();
    expect(screen.getByText('Today')).toBeTruthy();
    expect(screen.getByText('This week')).toBeTruthy();
    expect(screen.getByText('This month')).toBeTruthy();
  });
  it('should show collaborator drop down options when collaborator drop down is clicked', () => {
    render(<ToolBox />);
    const collaborators = screen.getByText('Collaborators');
    collaborators.click();
  });
  it('should show study drop down options when study drop down is clicked', () => {
    render(<ToolBox />);
    const study = screen.getByText('Study');
    study.click();
  });
});

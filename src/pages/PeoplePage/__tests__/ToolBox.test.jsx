import React from 'react';
import { render, screen } from '@testing-library/react';

import ToolBox from '../ToolBox';

describe('ToolBox', () => {
  it('renders ToolBox component', () => {
    render(<ToolBox />);
    expect(screen.getByText('Technology')).toBeTruthy();
    expect(screen.getByText('Role')).toBeTruthy();
  });
  it('renders ToolBox component with search button', () => {
    render(<ToolBox />);
    expect(screen.getByText('Search')).toBeTruthy();
  });
  it('render ToolBox component with add new member button', () => {
    render(<ToolBox />);
    expect(screen.getByText('Add new member')).toBeTruthy();
  });
  it('should show Technology drop down options when Technology drop down is clicked', () => {
    render(<ToolBox />);
    const technology = screen.getByText('Technology');
    technology.click();
  });
  it('should show Role drop down options when Role drop down is clicked', () => {
    render(<ToolBox />);
    const role = screen.getByText('Role');
    role.click();
  });
});

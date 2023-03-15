import React from 'react';
import { render, screen } from '@testing-library/react';

import ToolBox from '../ToolBox';

describe('ToolBox', () => {
  it('renders ToolBox component', () => {
    render(<ToolBox />);
    expect(screen.getByText('Time Frame')).toBeTruthy();
    expect(screen.getByText('Owner')).toBeTruthy();
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
    expect(screen.getByText('This year')).toBeTruthy();
  });
  it('should show owner drop down options when owner drop down is clicked', () => {
    render(<ToolBox />);
    const owner = screen.getByText('Owner');
    owner.click();
    expect(screen.getByText('Owner1')).toBeTruthy();
    expect(screen.getByText('Owner2')).toBeTruthy();
    expect(screen.getByText('Owner3')).toBeTruthy();
  });
  it('should show study drop down options when study drop down is clicked', () => {
    render(<ToolBox />);
    const study = screen.getByText('Study');
    study.click();
    expect(screen.getByText('Study1')).toBeTruthy();
    expect(screen.getByText('Study2')).toBeTruthy();
    expect(screen.getByText('Study3')).toBeTruthy();
  });
  it('should show search input when search button is clicked', () => {
    render(<ToolBox />);
    const search = screen.getByText('Search');
    search.click();
    expect(screen.getByPlaceholderText('Search for studies, tech stack, etc.')).toBeTruthy();
  });
});

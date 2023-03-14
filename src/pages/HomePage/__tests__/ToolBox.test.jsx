import React from 'react';
import { render, screen } from '@testing-library/react';

import ToolBox from '../ToolBox';

describe('ToolBox', () => {
  it('renders ToolBox component', () => {
    render(<ToolBox />);
    expect(screen.getByText('Time Frame')).toBeTruthy();
    expect(screen.getByText('Guilds')).toBeTruthy();
    expect(screen.getByText('Technology')).toBeTruthy();
  });
  it('renders ToolBox component with search', () => {
    render(<ToolBox />);
    expect(screen.getByPlaceholderText('Search for Studies, tech stack, etc')).toBeTruthy();
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
  it('should show Guilds drop down options when Guilds drop down is clicked', () => {
    render(<ToolBox />);
    const guilds = screen.getByText('Guilds');
    guilds.click();
    expect(screen.getByText('SWE')).toBeTruthy();
    expect(screen.getByText('Product')).toBeTruthy();
    expect(screen.getByText('Design')).toBeTruthy();
  });
  it('should show Technology drop down options when Technology drop down is clicked', () => {
    render(<ToolBox />);
    const technology = screen.getByText('Technology');
    technology.click();
    expect(screen.getByText('Node')).toBeTruthy();
    expect(screen.getByText('React Js')).toBeTruthy();
    expect(screen.getByText('Angular')).toBeTruthy();
  });
});

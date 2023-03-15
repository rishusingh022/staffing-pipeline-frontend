import React from 'react';
import { waitFor, fireEvent, render, screen } from '@testing-library/react';

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
    expect(screen.getByText('Node')).toBeTruthy();
    expect(screen.getByText('React Js')).toBeTruthy();
    expect(screen.getByText('Angular')).toBeTruthy();
  });
  it('should show Role drop down options when Role drop down is clicked', () => {
    render(<ToolBox />);
    const role = screen.getByText('Role');
    role.click();
    expect(screen.getByText('Junior Engineer')).toBeTruthy();
    expect(screen.getByText('Engineer1')).toBeTruthy();
    expect(screen.getByText('Engineer2')).toBeTruthy();
  });
  it('should show search input when search button is clicked', () => {
    render(<ToolBox />);
    const search = screen.getByText('Search');
    search.click();
    expect(screen.getByPlaceholderText('Search for people ...')).toBeTruthy();
  });
});

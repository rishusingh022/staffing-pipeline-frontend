import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import Search from '..';

describe('Search', () => {
  it('renders search', () => {
    render(<Search />);
    expect(screen.getByText('Search')).toBeTruthy();
  });
  it('renders search input with placeHolder value', () => {
    render(<Search placeHolderValue="Search for studies, tech stack, etc." />);
    expect(screen.getByPlaceholderText('Search for studies, tech stack, etc.')).toBeTruthy();
  });
  it('should call handleSearch when search button is clicked', () => {
    const handleSearch = jest.fn();
    render(<Search handleSearch={handleSearch} />);
    const search = screen.getByText('Search');
    search.click();
    expect(handleSearch).toHaveBeenCalled();
  });
  it('should call handleSearch with searchValue when search button is clicked', () => {
    const handleSearch = jest.fn();
    render(<Search handleSearch={handleSearch} />);
    const search = screen.getByText('Search');
    search.click();
    expect(handleSearch).toHaveBeenCalledWith('');
  });
  it('should set the set value in search input', () => {
    const handleSearch = jest.fn();
    const placeHolderValue = 'Search for studies, tech stack, etc.';
    render(<Search handleSearch={handleSearch} placeHolderValue={placeHolderValue} />);
    // set search input value using fireEvent
    fireEvent.change(screen.getByPlaceholderText(placeHolderValue), {
      target: { value: 'test' },
    });
    // click search button
    const search = screen.getByText('Search');
    search.click();
    // check if handleSearch is called with the value set in search input
    expect(handleSearch).toHaveBeenCalledWith('test');
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import { FeatureProvider } from '../../../context/FeatureContext';

import ToolBox from '../ToolBox';

describe('ToolBox', () => {
  it('renders ToolBox component', () => {
    render(
      <FeatureProvider>
        <ToolBox />
      </FeatureProvider>
    );
    expect(screen.getByText('Technology')).toBeTruthy();
    expect(screen.getByText('Role')).toBeTruthy();
  });
  it('renders ToolBox component with search button', () => {
    render(
      <FeatureProvider>
        <ToolBox />
      </FeatureProvider>
    );
    expect(screen.getByText('Search')).toBeTruthy();
  });
  it('should show Technology drop down options when Technology drop down is clicked', () => {
    render(
      <FeatureProvider>
        <ToolBox />
      </FeatureProvider>
    );
    const technology = screen.getByText('Technology');
    technology.click();
  });
  it('should show Role drop down options when Role drop down is clicked', () => {
    render(
      <FeatureProvider>
        <ToolBox />
      </FeatureProvider>
    );
    const role = screen.getByText('Role');
    role.click();
  });
});

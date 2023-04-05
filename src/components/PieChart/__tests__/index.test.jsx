import React from 'react';
import PieChart from '../index';
import { render } from '@testing-library/react';

describe('Pie chart', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<PieChart />);
    expect(asFragment()).toMatchSnapshot();
  });
});

import React from 'react';
import TechStackCard from '../index';
import { render } from '@testing-library/react';

describe('Tech stack', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<TechStackCard />);
    expect(asFragment()).toMatchSnapshot();
  });
});

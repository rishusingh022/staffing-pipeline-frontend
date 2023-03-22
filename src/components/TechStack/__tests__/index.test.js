import React from 'react';
import TechStack from '../index';
import { render } from '@testing-library/react';

describe('Tech stack', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<TechStack />);
    expect(asFragment()).toMatchSnapshot();
  });
});

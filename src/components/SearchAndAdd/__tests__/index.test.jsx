import React from 'react';
import { render } from '@testing-library/react';
import SearchAndAdd from '..';

describe('SearchAndAdd', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<SearchAndAdd />);
    expect(asFragment()).toMatchSnapshot();
  });
});

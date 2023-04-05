import React from 'react';
import Spinner from '../index';
import { render } from '@testing-library/react';

describe('Spinner', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<Spinner />);
    expect(asFragment()).toMatchSnapshot();
  });
});

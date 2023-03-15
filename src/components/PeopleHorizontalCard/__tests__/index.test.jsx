import React from 'react';
import PeopleHorizontalCard from '..';
import { render } from '@testing-library/react';

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

describe('PeopleHorizontalCard Snapshot', () => {
  it('should render', () => {
    const { asFragment } = render(<PeopleHorizontalCard />);
    expect(asFragment()).toMatchSnapshot();
  });
});

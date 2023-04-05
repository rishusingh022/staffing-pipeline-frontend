import React from 'react';
import { render } from '@testing-library/react';
import Count from '..';

jest.mock('react-router-dom', () => ({
  useNavigate: () => ({
    mockedNavigate: jest.fn(),
  }),
}));

describe('Count engagements, users and case-studies', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<Count type="users" setObjectCount={() => {}} objectCount={12} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

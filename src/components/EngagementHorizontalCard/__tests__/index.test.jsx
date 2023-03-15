import React from 'react';
import EngagementHorizontalCard from '..';
import { render } from '@testing-library/react';

const mockNavigate = jest.fn();
const mockUseParams = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useParams: () => mockUseParams,
}));

describe('EngagementHorizontalCard', () => {
  it('should render', () => {
    const { asFragment } = render(
      <EngagementHorizontalCard
        engagementId={'123456'}
        engagementTitle={'Project'}
        engagementImage={'EngagementImage'}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

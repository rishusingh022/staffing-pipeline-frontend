import React from 'react';
import BarChart from '..';
import { render } from '@testing-library/react';

describe('Bar chart', () => {
  const mockStatusData = [
    { name: 'Ongoing', y: 5 },
    { name: 'Completed', y: 8 },
    { name: 'Upcoming', y: 2 },
  ];
  it('should render correctly', () => {
    const { asFragment } = render(
      <BarChart numberOfEngagements={[1, 2]} peopleStaffed={[4, 5]} setEngagementStatusData={mockStatusData} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

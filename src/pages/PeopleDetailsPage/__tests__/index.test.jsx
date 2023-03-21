import React from 'react';
import PeopleDetailsPage from '..';
import { waitFor, render } from '@testing-library/react';
import { RoleProvider } from '../../../context/RoleContext';
import makeRequest from '../../../utils/makeRequest/';
import { default as mockUserData } from '../../../mocks/PeopleDetailsPage';

jest.mock('../../../utils/makeRequest');

const mockNavigate = jest.fn();
const mockUseParams = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useParams: () => mockUseParams,
}));

describe('PeopleDetailsPage', () => {
  it('should call the makeRequest function when people details page is rendered', async () => {
    mockUseParams.mockReturnValue({ userId: mockUserData.userId });
    makeRequest.mockResolvedValue({});
    render(
      <RoleProvider>
        <PeopleDetailsPage />
      </RoleProvider>
    );
    await waitFor(() => expect(makeRequest).toHaveBeenCalledTimes(1));
  });
});

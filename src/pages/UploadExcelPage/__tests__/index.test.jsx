import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { FeatureProvider } from '../../../context/FeatureContext';
import UploadExcelPage from '..';

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

jest.mock('@okta/okta-react', () => ({
  useOktaAuth: () => ({
    authState: {
      isAuthenticated: true,
      idToken: {
        claims: {
          email: '',
          name: '',
        },
      },
    },
  }),
}));

describe('Upload Excel Page', () => {
  it('should render without crashing', () => {
    const { asFragment } = render(
      <FeatureProvider>
        <UploadExcelPage />
      </FeatureProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should show Select File button', () => {
    render(
      <FeatureProvider>
        <UploadExcelPage />
      </FeatureProvider>
    );
    const selectButton = screen.getByText('Select Excel');
    expect(selectButton).toBeTruthy();
  });
  it('should show Upload button', () => {
    render(
      <FeatureProvider>
        <UploadExcelPage />
      </FeatureProvider>
    );
    const uploadButton = screen.getByText('Upload');
    expect(uploadButton).toBeTruthy();
  });
});

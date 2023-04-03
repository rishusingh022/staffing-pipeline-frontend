import { render } from '@testing-library/react';
import * as React from 'react';
import PeoplePage from '..';
import { FeatureProvider } from '../../../context/FeatureContext';

jest.mock('react-router-dom');
describe('PeoplePage', () => {
  it('should render without crashing', () => {
    const { asFragment } = render(
      <FeatureProvider>
        <PeoplePage />
      </FeatureProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

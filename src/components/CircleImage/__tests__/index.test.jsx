import React from 'react';
import CircleImage from '..';
import { render } from '@testing-library/react';

describe('Circle Image', () => {
  it('should render correctly', () => {
    const { getAllByAltText } = render(
      <CircleImage
        images={[
          { url: 'url', altText: 'altText' },
          { url: 'urlOne', altText: 'altTextOne' },
        ]}
      />
    );
    expect(getAllByAltText('altText')).toBeTruthy();
  });
});

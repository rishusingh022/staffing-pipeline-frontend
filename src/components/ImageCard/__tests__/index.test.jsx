import React from 'react';
import { render } from '@testing-library/react';
import ImageCard from '..';

describe('ImageCard', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <ImageCard
        altText={'Image'}
        buttonText={'Know More'}
        daysToGo={10}
        designation={'Software Engineer'}
        handleButtonClick={() => {}}
        identityNumber={'FMNO: 123456'}
        imageUrl={
          'https://images.unsplash.com/photo-1616486497199-1c1e1f1b1b1a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        }
        location={'Bangalore, India'}
        name={'John Doe'}
        isEngagementCard={false}
        isUserCard={false}
        startDate={'2021-03-01'}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

import React from 'react';
// eslint-disable-next-line no-unused-vars
import { fireEvent, screen, render } from '@testing-library/react';
import EngagementCard from '../index';
import { Router } from 'react-router-dom';

jest.mock('react-router-dom');

describe('EngagementCard', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <Router>
        <EngagementCard
          altText={'Image'}
          buttonText={'Know More'}
          handleButtonClick={() => {}}
          identityNumber={'FMNO: 123456'}
          imageUrl={
            'https://images.unsplash.com/photo-1616486497199-1c1e1f1b1b1a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
          }
          name={'John Doe'}
          startDate={'2021-03-01'}
          status={'Active'}
        />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with no image', () => {
    const { asFragment } = render(
      <Router>
        <EngagementCard
          altText={'Image'}
          buttonText={'Know More'}
          handleButtonClick={() => {}}
          identityNumber={'FMNO: 123456'}
          imageUrl={null}
          name={'John Doe'}
          startDate={'2021-03-01'}
          status={'Active'}
        />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  // it('should navigate to engagement page on click of read more button', () => {
  //   const navigate = jest.fn();
  //   render(
  //     <Router>
  //       <EngagementCard
  //         altText={'Image'}
  //         buttonText={'Know More'}
  //         handleButtonClick={() => {}}
  //         identityNumber={'FMNO: 123456'}
  //         imageUrl={
  //           'https://images.unsplash.com/photo-1616486497199-1c1e1f1b1b1a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  //         }
  //         name={'John Doe'}
  //         startDate={'2021-03-01'}
  //         status={'Active'}
  //       />
  //     </Router>

  //   );

  //   const button = screen.getByTestId('read-more-button');
  //   fireEvent.click(button);
  //   expect(navigate).toHaveBeenCalledWith('/projects/FMNO: 123456');
  // });
});

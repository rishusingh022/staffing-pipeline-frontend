import React from 'react';
import LoginPage from '..';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

describe('LoginPage Snapshot', () => {
  it('should render', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

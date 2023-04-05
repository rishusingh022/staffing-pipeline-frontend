import React from 'react';
import PaginationControl from '../index';
import { render } from '@testing-library/react';
// eslint-disable-next-line no-unused-vars
import { screen, fireEvent } from '@testing-library/react';

describe('Pagination control', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<PaginationControl />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with props', () => {
    const { asFragment } = render(<PaginationControl pageNumber={1} setPageNumber={1} objectCount={1} />);
    expect(asFragment()).toMatchSnapshot();
  });

  // it('should call goNext function when is next button clicked', () => {
  //   const goNext = jest.fn();
  //   render(<PaginationControl pageNumber={1} objectCount={1} />);
  //   const nextButton = screen.getByTestId('next-button');
  //   fireEvent.click(nextButton);
  //   expect(goNext).toHaveBeenCalled();
  // });

  // it('should call goPrev function when is prev button clicked', () => {
  //   const goPrev = jest.fn();
  //   render(<PaginationControl pageNumber={1} objectCount={1} />);
  //   const prevButton = screen.getByTestId('prev-button');
  //   fireEvent.click(prevButton);
  //   expect(goPrev).toHaveBeenCalled();
  // });

  // it('should call handleChange function when is input value changed', () => {
  //   const handleChange = jest.fn();
  //   render(<PaginationControl pageNumber={1} objectCount={1} />);
  //   const input = screen.getByTestId('input');
  //   fireEvent.change(input);
  //   expect(handleChange).toHaveBeenCalled();
  // });
});

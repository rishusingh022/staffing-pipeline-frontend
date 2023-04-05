import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import CaseStudyModal from '..';
import Button from '../../Button';

const mockedNavigate = jest.fn();
const mockedParam = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockedNavigate,
  useParams: () => mockedParam,
}));

describe('Case study modal', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<CaseStudyModal setIsOpen={true} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should call handleCreateCaseStudy function when clicked on submit button', () => {
    const handleCreateCaseStudy = jest.fn();
    render(<Button buttonText="Submit" handleClick={handleCreateCaseStudy} />);
    const button = screen.getByTestId('button');
    fireEvent.click(button);
    expect(handleCreateCaseStudy).toBeCalled();
  });
  it('should set setIsOpen to false when clicked on cancel button', () => {
    const setIsOpen = jest.fn();
    render(<Button buttonText="Cancel" handleClick={setIsOpen} />);
    const button = screen.getByTestId('button');
    fireEvent.click(button);
    expect(setIsOpen).toBeCalled();
  });
});

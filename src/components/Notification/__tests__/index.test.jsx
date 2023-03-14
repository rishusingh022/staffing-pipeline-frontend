import Notification from '..';
import { render, screen, fireEvent } from '@testing-library/react';
describe('Notification', () => {
  it('Notification snapshot', () => {
    const { asFragment } = render(<Notification message="test" handleClose={jest.fn} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders notification', () => {
    render(<Notification message="test" handleClose={jest.fn} />);
    expect(screen.getByText('test')).toBeTruthy();
  });
  it("should close when 'X' is clicked", () => {
    const mockHandleCloseFunc = jest.fn();
    render(<Notification message="test" handleClose={mockHandleCloseFunc} />);
    fireEvent.click(screen.getByTestId('X'));
    expect(mockHandleCloseFunc).toHaveBeenCalled();
  });
});

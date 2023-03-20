import React from 'react';
import { render } from '@testing-library/react';
import Modal from '..';

const onClose = jest.fn();

describe('Modal', () => {
  it('should render correctly if isOpen prop is true', () => {
    const { asFragment } = render(<Modal {...{ isOpen: true, onClose }} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not render if isOpen prop is false', () => {
    const { asFragment } = render(<Modal {...{ isOpen: false, onClose }} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

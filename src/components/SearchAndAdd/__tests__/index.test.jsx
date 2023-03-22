import React from 'react';
import { render } from '@testing-library/react';
import SearchAndAdd from '..';

const entity = 'skills';
const setIsOpen = jest.fn();
const navigate = jest.fn();
const handleItem = jest.fn();

//add navigate dummy function
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

describe('SearchAndAdd', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <SearchAndAdd entity={entity} setIsOpen={setIsOpen} navigate={navigate} handleItem={handleItem} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

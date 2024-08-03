import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import {ReactTestInstance} from 'react-test-renderer';
import {InputSearch} from './InputSearch';

const PLACEHOLDER = 'Buscar';
const TEXT_SEARCH = 'A Game of Thrones';

describe(InputSearch, () => {
  let inputNode: ReactTestInstance;

  it('Should exists input to search with the correct placeholder', async () => {
    render(<InputSearch placeholder={PLACEHOLDER} onChangeText={() => {}} />);
    inputNode = screen.getByPlaceholderText(PLACEHOLDER);
    expect(inputNode).toBeOnTheScreen();
  });

  it('Should call to onChangeText method', async () => {
    const changeTextMockFN = jest.fn();

    render(
      <InputSearch placeholder={PLACEHOLDER} onChangeText={changeTextMockFN} />,
    );
    inputNode = screen.getByPlaceholderText(PLACEHOLDER);

    fireEvent.changeText(inputNode, TEXT_SEARCH);

    await waitFor(() => {
      expect(changeTextMockFN).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(changeTextMockFN).toHaveBeenCalledWith(TEXT_SEARCH);
    });
  });
});

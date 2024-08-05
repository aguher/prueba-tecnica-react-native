import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react-native';
import {ReactTestInstance} from 'react-test-renderer';

import {BOOK_MOCKED} from '@testUtils/index';
import {BookList} from './BookList';
const LABEL_CARD = 'EXAMPLE';

describe(BookList, () => {
  let titleNode: ReactTestInstance;

  it('Should render a card with a title', async () => {
    const mockJestFn = jest.fn();

    render(
      <BookList
        noFlex
        title={LABEL_CARD}
        items={[BOOK_MOCKED]}
        handleBook={mockJestFn}
        isRecentList
      />,
    );
    titleNode = screen.getByText(LABEL_CARD);

    expect(titleNode).toBeOnTheScreen();
  });

  it('Should call a method when press on the card', async () => {
    const mockJestFn = jest.fn();

    render(
      <BookList
        noFlex
        title={LABEL_CARD}
        items={[BOOK_MOCKED]}
        handleBook={mockJestFn}
        isRecentList
      />,
    );
    titleNode = screen.getByTestId(`${BOOK_MOCKED.isbn}-recent`);
    fireEvent.press(titleNode);
    expect(mockJestFn).toHaveBeenCalledTimes(1);
  });
});

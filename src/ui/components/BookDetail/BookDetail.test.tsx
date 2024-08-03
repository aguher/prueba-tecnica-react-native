import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react-native';

import {BOOK_MOCKED} from '@testUtils/index';
import {
  BookDetail,
  LABEL_ADD_FAVORITE,
  LABEL_CLOSE,
  LABEL_REMOVE_FAVORITE,
} from './BookDetail';

describe(BookDetail, () => {
  it('Should render the details of book', async () => {
    render(
      <BookDetail
        selectedBook={BOOK_MOCKED}
        isFavorite={false}
        onClose={() => {}}
        handleFavorite={() => {}}
      />,
    );
    expect(screen.getByText(BOOK_MOCKED.name)).toBeTruthy();
    expect(screen.getByText(`Autor: ${BOOK_MOCKED.authors[0]}`)).toBeTruthy();
    expect(
      screen.getByText(`Editorial: ${BOOK_MOCKED.publisher}`),
    ).toBeTruthy();
    expect(
      screen.getByText(`Número de páginas: ${BOOK_MOCKED.numberOfPages}`),
    ).toBeTruthy();
    expect(
      screen.getByText(`Año de publicación: ${BOOK_MOCKED.released}`),
    ).toBeTruthy();
  });

  it('Should render a favorite button and able to press it', async () => {
    const mockFavorite = jest.fn();
    render(
      <BookDetail
        selectedBook={BOOK_MOCKED}
        isFavorite={false}
        onClose={() => {}}
        handleFavorite={mockFavorite}
      />,
    );

    const favBtn = screen.getByText(LABEL_ADD_FAVORITE);
    fireEvent.press(favBtn);
    expect(mockFavorite).toHaveBeenCalledTimes(1);
  });

  it('Should render a remove favorite button and able to press it', async () => {
    const mockFavorite = jest.fn();
    render(
      <BookDetail
        selectedBook={BOOK_MOCKED}
        isFavorite={true}
        onClose={() => {}}
        handleFavorite={mockFavorite}
      />,
    );

    const favBtn = screen.getByText(LABEL_REMOVE_FAVORITE);
    fireEvent.press(favBtn);
    expect(mockFavorite).toHaveBeenCalledTimes(1);
  });

  it('Should render a close button and able to press it', async () => {
    const mockClose = jest.fn();
    render(
      <BookDetail
        selectedBook={BOOK_MOCKED}
        isFavorite={true}
        onClose={mockClose}
        handleFavorite={() => {}}
      />,
    );

    const closeBtn = screen.getByText(LABEL_CLOSE);
    fireEvent.press(closeBtn);
    expect(mockClose).toHaveBeenCalledTimes(1);
  });
});

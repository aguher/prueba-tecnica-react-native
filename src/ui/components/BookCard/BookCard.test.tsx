import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react-native';
import {ReactTestInstance} from 'react-test-renderer';

import {BOOK_MOCKED} from '@testUtils/index';
import {BookCard} from './BookCard';
import {ViewToken} from 'react-native';
import {Book} from '@core/Book';
import {SharedValue, useSharedValue} from 'react-native-reanimated';
import {BooksContext} from 'ui/contexts/BooksContext';

describe(BookCard, () => {
  let titleNode: ReactTestInstance;
  it('Should render an image along a title', async () => {
    const mockJestFn = jest.fn();
    const mockToken: SharedValue<ViewToken<Book>[]> = useSharedValue<
      ViewToken<Book>[]
    >([]);

    render(
      <BookCard
        viewableItems={mockToken}
        book={BOOK_MOCKED}
        isRecent={false}
        handleBook={mockJestFn}
      />,
    );
    titleNode = screen.getByText(BOOK_MOCKED.name);

    expect(titleNode).toBeOnTheScreen();
    const image = screen.getByLabelText('image');
    expect(image).toBeTruthy();
    expect(image.props.source).toEqual({
      uri: `https://covers.openlibrary.org/b/isbn/${BOOK_MOCKED.isbn}-M.jpg`,
    });
    expect(image.props.style).toEqual({width: 50, marginRight: 10, height: 50});
  });

  it('Should show a star icon if it is favorite', async () => {
    const mockJestFn = jest.fn();
    const mockToken: SharedValue<ViewToken<Book>[]> = useSharedValue<
      ViewToken<Book>[]
    >([]);
    render(
      <BooksContext.Provider
        value={{
          recents: [],
          favorites: [],
          addRecent: () => {},
          toggleFavorites: () => {},
          isFavorite: _ => true,
          isSortingAsc: true,
          onSort: () => {},
        }}>
        <BookCard
          book={BOOK_MOCKED}
          isRecent={false}
          viewableItems={mockToken}
          handleBook={mockJestFn}
        />
      </BooksContext.Provider>,
    );
    const starIcon = screen.getByText('★');
    expect(starIcon).toBeOnTheScreen();
    expect(starIcon.props.style).toEqual({color: 'gold', marginLeft: 'auto'});
  });

  it('Should handle method when press over the card', async () => {
    const mockJestFn = jest.fn();
    const mockToken: SharedValue<ViewToken<Book>[]> = useSharedValue<
      ViewToken<Book>[]
    >([]);
    render(
      <BookCard
        book={BOOK_MOCKED}
        isRecent={false}
        viewableItems={mockToken}
        handleBook={mockJestFn}
      />,
    );
    titleNode = screen.getByText(BOOK_MOCKED.name);
    fireEvent.press(titleNode);
    expect(mockJestFn).toHaveBeenCalledTimes(1);
  });
});

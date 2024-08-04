import HomeScreen from './HomeScreen';
import React, {useEffect, useState} from 'react';

import lodash from 'lodash';

import {Book} from '@core/Book';
import {useNavigator} from 'ui/hooks/useNavigator';

export const HomeController = () => {
  const {goToDetail} = useNavigator();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [recentBooks, setRecentBooks] = useState<Set<string>>(new Set());

  useEffect(() => {
    initBooks();
  }, []);

  // Obtenemos los libros
  const initBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://anapioficeandfire.com/api/books');
      const data = await response.json();
      setBooks(data);
      setError(null);
    } catch (_) {
      setError('Error fetching books');
    } finally {
      setLoading(false);
    }
  };
  const booksData = () => {
    return lodash.filter(books, b =>
      lodash.includes(lodash.toLower(b.name), lodash.toLower(searchQuery)),
    );
  };

  useEffect(() => {
    booksData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  // Presiona un libro
  const handleBook = (book: Book) => {
    const isFavorite = favorites.has(book.url);
    goToDetail(book, isFavorite);
    setRecentBooks(prev => new Set(prev).add(book.url));
  };

  // Presiona el botón de favoritos
  const handleFavorite = (b: Book) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(b.url)) {
        newFavorites.delete(b.url);
      } else {
        newFavorites.add(b.url);
      }
      return newFavorites;
    });
  };
  return (
    <HomeScreen
      onSearchQuery={setSearchQuery}
      isLoading={loading}
      error={error}
      refreshBooks={initBooks}
      handleBook={handleBook}
      handleFavorite={handleFavorite}
      data={booksData()}
      recentBooks={recentBooks}
      favorites={favorites}
    />
  );
};

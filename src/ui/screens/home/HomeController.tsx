import HomeScreen from './HomeScreen';
import React, {useEffect, useState} from 'react';

import lodash from 'lodash';

import {Book, bookService} from '@core/Book';
import {useQueryService, useNavigator} from '@hooks/index';
import {useBooks} from 'ui/contexts/BooksContext';

export const HomeController = () => {
  const {addRecent, recents} = useBooks();
  const {goToDetail} = useNavigator();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const {data, isLoading, error, refetch} = useQueryService(
    'list-books',
    [],
    () => bookService.getAll(),
  );

  const booksData = () => {
    return lodash.filter(data, b =>
      lodash.includes(lodash.toLower(b.name), lodash.toLower(searchQuery)),
    );
  };

  useEffect(() => {
    booksData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const handleBook = (book: Book) => {
    goToDetail(book);
    addRecent(book);
  };

  return (
    <HomeScreen
      onSearchQuery={setSearchQuery}
      isLoading={isLoading}
      error={error}
      refreshBooks={refetch}
      handleBook={handleBook}
      data={booksData()}
      recentBooks={recents}
    />
  );
};

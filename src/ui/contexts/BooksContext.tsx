import {Book} from '@core/Book';
import {booksStorage, typeOrder} from '@core/Book/infrastucture/booksStorage';
import {isUndefined} from 'lodash';
import {createContext, ReactNode, useContext, useEffect, useState} from 'react';

interface BooksState {
  recents: Book[];
  favorites: Book[];
  addRecent: (book: Book) => void;
  toggleFavorites: (book: Book) => void;
  isFavorite: (book: Book) => boolean;
  isSortingAsc: boolean | undefined;
  onSort: () => void;
}

export const BooksContext = createContext<BooksState>({
  recents: [],
  favorites: [],
  addRecent: () => {},
  toggleFavorites: () => {},
  isFavorite: () => false,
  isSortingAsc: false,
  onSort: () => {},
});

export const BooksProvider = ({children}: {children: ReactNode}) => {
  const [recents, setRecents] = useState<Book[]>([]);
  const [favorites, setFavorites] = useState<Book[]>([]);
  const [isSortingAsc, setIsSortingAsc] = useState<boolean | undefined>(
    undefined,
  );

  useEffect(() => {
    const checkOrder = async () => {
      const order = await booksStorage.getOrder();
      if (order === typeOrder.ASCENDING) {
        setIsSortingAsc(true);
      } else if (order === typeOrder.DESCENDING) {
        setIsSortingAsc(false);
      }
    };

    checkOrder();
  }, []);
  const addRecent = (book: Book) => {
    if (!recents.some(recent => recent.isbn === book.isbn)) {
      setRecents([...recents, book]);
    }
  };

  const toggleFavorites = (book: Book) => {
    setFavorites(toggleFav(favorites, book));
  };

  const isFavorite = (book: Book) => {
    return favorites.some(favorite => favorite.isbn === book.isbn);
  };

  const onSort = async () => {
    const sort = isUndefined(isSortingAsc) ? true : isSortingAsc ? false : true;
    setIsSortingAsc(sort);
    booksStorage.setOrder(sort);
  };

  return (
    <BooksContext.Provider
      value={{
        recents,
        favorites,
        addRecent,
        toggleFavorites,
        isFavorite,
        isSortingAsc,
        onSort,
      }}>
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => useContext(BooksContext);

const toggleFav = (books: Book[], book: Book) => {
  const clonedBooks = [...books];
  const index = clonedBooks.findIndex(item => item.isbn === book.isbn);

  if (index !== -1) {
    return clonedBooks.filter(item => item.isbn !== book.isbn);
  } else {
    return [...clonedBooks, book];
  }
};

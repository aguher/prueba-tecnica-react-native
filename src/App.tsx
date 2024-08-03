import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import lodash from 'lodash';
import {
  BookCard,
  BookDetail,
  InputSearch,
  UpdateBooks,
} from '@components/index';
import {Book} from '@core/Book';

const App = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [recentBooks, setRecentBooks] = useState<Set<string>>(new Set());
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
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
  const handleBook = (bk: Book) => {
    setSelectedBook(bk);
    setRecentBooks(prev => new Set(prev).add(bk.url));
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
    <SafeAreaView style={styles.main}>
      <ScrollView style={styles.container}>
        <InputSearch placeholder="Buscar" onChangeText={setSearchQuery} />
        <UpdateBooks onUpdate={initBooks} />
        {loading ? (
          <ActivityIndicator testID="loading" size="large" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          booksData().map((book: Book, index) => {
            return (
              <View key={book.isbn}>
                {index === 0 && (
                  <View key={index}>
                    <Text style={styles.sectionTotal}>
                      Libros: {booksData().length}
                    </Text>
                    {recentBooks.size > 0 && (
                      <View key={`${book.released}-recent`}>
                        <Text style={styles.sectionHeader}>Recientes</Text>
                        {Array.from(recentBooks).map(url => {
                          const bookItem = books.find(
                            (inner: Book) => inner.url === url,
                          );
                          return bookItem ? (
                            <BookCard
                              key={`${bookItem.isbn}-recent`}
                              book={bookItem}
                              isRecent
                              handleBook={handleBook}
                              isFavorite={favorites.has(bookItem.url)}
                            />
                          ) : null;
                        })}
                        <Text style={styles.sectionHeader}>Libros</Text>
                      </View>
                    )}
                  </View>
                )}
                <BookCard
                  key={book.isbn}
                  book={book}
                  isRecent={false}
                  handleBook={handleBook}
                  isFavorite={favorites.has(book.url)}
                />
              </View>
            );
          })
        )}
        {selectedBook && (
          <BookDetail
            handleFavorite={handleFavorite}
            onClose={() => setSelectedBook(null)}
            selectedBook={selectedBook}
            isFavorite={favorites.has(selectedBook.url)}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

// Estilos
const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },

  errorText: {
    color: 'red',
    textAlign: 'center',
  },

  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  sectionTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default App;

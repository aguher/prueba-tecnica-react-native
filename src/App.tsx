import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  Linking,
  ScrollView,
} from 'react-native';
import lodash from 'lodash';

import {InputSearch} from './ui/components/InputSearch/InputSearch';
import {UpdateBooks} from './ui/components/UpdateBooks/UpdateBooks';

const App = () => {
  const [books, setBooks] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [recentBooks, setRecentBooks] = useState<Set<string>>(new Set());
  const [selectedBook, setSelectedBook] = useState(null);
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
    } catch (error) {
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
  }, [searchQuery]);

  // Presiona un libro
  const handleBook = bk => {
    setSelectedBook(bk);
    setRecentBooks(prev => new Set(prev).add(bk.url));
  };

  // Presiona el botón de favoritos
  const handleFavorite = b => {
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

  const renderBookItem = ({item, isRecent}) => (
    <TouchableOpacity
      testID={`${item.isbn}-${isRecent ? 'recent' : 'no-recent'}`}
      onPress={() => handleBook(item)}
      style={styles.bookItem}>
      <Image
        source={{
          uri: `https://covers.openlibrary.org/b/isbn/${item.isbn}-M.jpg`,
        }}
        style={styles.bookImage}
      />
      <Text style={styles.bookTitle}>{item.name}</Text>
      {favorites.has(item.url) && <Text style={styles.favoriteIcon}>★</Text>}
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <InputSearch placeholder="Buscar" onChangeText={setSearchQuery} />
        <UpdateBooks onUpdate={initBooks} />
        {loading ? (
          <ActivityIndicator testID="loading" size="large" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          booksData().map((book, index) => {
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
                          const book = books.find(book => book.url === url);
                          return book
                            ? renderBookItem({item: book, isRecent: true})
                            : null;
                        })}
                        <Text style={styles.sectionHeader}>Libros</Text>
                      </View>
                    )}
                  </View>
                )}
                {renderBookItem({item: book, isRecent: false})}
              </View>
            );
          })
        )}
        {selectedBook && (
          <View style={styles.bookDetail}>
            <Text style={styles.bookDetailTitle}>{selectedBook.name}</Text>
            <Text>Autor: {selectedBook.authors.join(', ')}</Text>
            <Text>Editorial: {selectedBook.publisher}</Text>
            <Text>Número de páginas: {selectedBook.numberOfPages}</Text>
            <Text>Año de publicación: {selectedBook.released}</Text>
            <TouchableOpacity
              onPress={() => handleFavorite(selectedBook)}
              style={styles.favoriteButton}>
              <Text>
                {favorites.has(selectedBook.url)
                  ? 'Quitar de favoritos'
                  : 'Agregar a favoritos'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedBook(null)}
              style={styles.closeButton}>
              <Text>Cerrar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Linking.canOpenURL(selectedBook.url).then(() => {
                  Linking.openURL(selectedBook.url);
                });
              }}
              style={styles.urlButton}>
              <Text>Abrir API en el navegador</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },

  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  bookItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  bookImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  bookTitle: {
    fontSize: 16,
  },
  favoriteIcon: {
    marginLeft: 'auto',
    color: 'gold',
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
  bookDetail: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    padding: 16,
  },
  bookDetailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  favoriteButton: {
    backgroundColor: '#007bff',
    padding: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  closeButton: {
    backgroundColor: '#ccc',
    padding: 10,
    alignItems: 'center',
  },
  urlButton: {
    backgroundColor: '#02874a',
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
});

export default App;

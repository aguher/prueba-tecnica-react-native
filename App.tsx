import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  Linking,
  ScrollView,
} from 'react-native';
import lodash from 'lodash';

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
      console.log('Fetching books');

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

  const renderBookItem = ({item}) => (
    <TouchableOpacity onPress={() => handleBook(item)} style={styles.bookItem}>
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
        <TextInput
          placeholder="Buscar"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
        <TouchableOpacity onPress={initBooks} style={styles.searchButton}>
          <Text>Actualizar libros</Text>
        </TouchableOpacity>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          booksData().map((book, index) => {
            return (
              <View key={book.publisher}>
                {index === 0 && (
                  <View>
                    <Text style={styles.sectionTotal}>
                      Libros: {booksData().length}
                    </Text>
                    {recentBooks.size > 0 && (
                      <View>
                        <Text style={styles.sectionHeader}>Recientes</Text>
                        {Array.from(recentBooks).map(url => {
                          const book = books.find(book => book.url === url);
                          return book ? renderBookItem({item: book}) : null;
                        })}
                        <Text style={styles.sectionHeader}>Libros</Text>
                      </View>
                    )}
                  </View>
                )}
                {renderBookItem({item: book})}
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
  searchInput: {
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 8,
    marginBottom: 8,
  },
  searchButton: {
    backgroundColor: 'transparent',
    padding: 10,
    alignItems: 'center',
    marginBottom: 16,
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

import {BookCard} from '@components/BookCard';
import {InputSearch} from '@components/InputSearch';
import {UpdateBooks} from '@components/UpdateBooks';
import {Book} from '@core/Book';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationOptions} from 'ui/navigation/routes';

interface HomeScreenProps {
  isLoading: boolean;
  error: string | null;
  refreshBooks: () => void;
  handleBook: (book: Book) => void;
  handleFavorite: (book: Book) => void;
  data: Book[];
  recentBooks: Set<string>;
  favorites: Set<string>;
  onSearchQuery: (query: string) => void;
}

export default function HomeScreen({
  isLoading,
  error,
  data,
  refreshBooks,
  recentBooks,
  handleBook,
  favorites,
  onSearchQuery,
}: HomeScreenProps) {
  return (
    <SafeAreaView style={styles.main}>
      <ScrollView style={styles.container}>
        <InputSearch placeholder="Buscar" onChangeText={onSearchQuery} />
        <UpdateBooks onUpdate={refreshBooks} />
        {isLoading ? (
          <ActivityIndicator testID="loading" size="large" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          data.map((book: Book, index: number) => {
            return (
              <View key={book.isbn}>
                {index === 0 && (
                  <View key={index}>
                    <Text style={styles.sectionTotal}>
                      Libros: {data.length}
                    </Text>
                    {recentBooks.size > 0 && (
                      <View key={`${book.released}-recent`}>
                        <Text style={styles.sectionHeader}>Recientes</Text>
                        {Array.from(recentBooks).map(url => {
                          const bookItem = data.find(
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
      </ScrollView>
    </SafeAreaView>
  );
}

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

export const homeNavigationOptions: NavigationOptions = {
  headerShown: false,
};

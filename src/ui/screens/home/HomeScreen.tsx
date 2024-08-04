import {BookCard} from '@components/BookCard';
import {InputSearch} from '@components/InputSearch';
import {SortByName} from '@components/SortByName';
import {UpdateBooks} from '@components/UpdateBooks';
import {Book} from '@core/Book';
import {useEffect} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useBooks} from 'ui/contexts/BooksContext';
import {NavigationOptions} from 'ui/navigation/routes';

interface HomeScreenProps {
  isLoading: boolean;
  error: unknown;
  refreshBooks: () => void;
  handleBook: (book: Book) => void;
  data: Book[] | undefined;
  recentBooks: Book[];
  onSearchQuery: (query: string) => void;
}

export default function HomeScreen({
  isLoading,
  error,
  data,
  refreshBooks,
  recentBooks,
  handleBook,
  onSearchQuery,
}: HomeScreenProps) {
  const {isFavorite, isSortingAsc, onSort} = useBooks();

  useEffect(() => {}, [isSortingAsc]);

  const sortingData = () => {
    if (!data || data.length === 0) {
      return [];
    }
    return [...data].sort((a, b) => {
      const compareResult = a.name.localeCompare(b.name);
      return isSortingAsc ? compareResult : -compareResult;
    });
  };

  return (
    <SafeAreaView style={styles.main}>
      <ScrollView style={styles.container}>
        <InputSearch placeholder="Buscar" onChangeText={onSearchQuery} />
        <View style={styles.column}>
          <UpdateBooks onUpdate={refreshBooks} />
          <SortByName isAsc={isSortingAsc} onSort={onSort} />
        </View>
        {isLoading ? (
          <ActivityIndicator testID="loading" size="large" />
        ) : error ? (
          <Text style={styles.errorText}>{error as string}</Text>
        ) : !data || data?.length === 0 ? (
          <Text style={styles.errorText}>No hay valores</Text>
        ) : (
          sortingData().map((book: Book, index: number) => {
            return (
              <View key={book.isbn}>
                {index === 0 && (
                  <View key={index}>
                    <Text style={styles.sectionTotal}>
                      Libros: {data.length}
                    </Text>
                    {recentBooks.length > 0 && (
                      <View key={`${book.released}-recent`}>
                        <Text style={styles.sectionHeader}>Recientes</Text>
                        {recentBooks.map(item => {
                          const bookItem = data.find(
                            (inner: Book) => inner.isbn === item.isbn,
                          );
                          return bookItem ? (
                            <BookCard
                              key={`${bookItem.isbn}-recent`}
                              book={bookItem}
                              isRecent
                              handleBook={handleBook}
                              isFavorite={isFavorite(bookItem)}
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
                  isFavorite={isFavorite(book)}
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
  column: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
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

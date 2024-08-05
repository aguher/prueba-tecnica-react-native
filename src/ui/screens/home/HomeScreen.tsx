import {useEffect} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {
  BookList,
  InputSearch,
  SortByName,
  UpdateBooks,
} from '@components/index';
import {Book} from '@core/Book';
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
  const {isSortingAsc, onSort} = useBooks();

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
    <SafeAreaView style={styles.flex1}>
      <View style={styles.container}>
        <View style={styles.row}>
          <InputSearch placeholder="Buscar" onChangeText={onSearchQuery} />
          <View style={styles.column}>
            <UpdateBooks onUpdate={refreshBooks} />
            <SortByName isAsc={isSortingAsc} onSort={onSort} />
          </View>
        </View>
        <View style={styles.flex1}>
          {isLoading ? (
            <ActivityIndicator testID="loading" size="large" />
          ) : error ? (
            <Text style={styles.errorText}>{error as string}</Text>
          ) : !data || data?.length === 0 ? (
            <Text style={styles.errorText}>No hay valores</Text>
          ) : (
            <>
              <View>
                <Text style={styles.sectionTotal}>Libros: {data.length}</Text>
              </View>
              {recentBooks.length > 0 && (
                <BookList
                  noFlex
                  title="Recientes"
                  items={recentBooks}
                  handleBook={handleBook}
                  isRecentList
                />
              )}
              <BookList
                title={recentBooks.length > 0 ? 'Libros' : undefined}
                items={sortingData()}
                handleBook={handleBook}
              />
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  row: {
    height: 90,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  column: {
    flex: 1,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
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

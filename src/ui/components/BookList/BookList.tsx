import {BookCard} from '@components/BookCard';
import {Book} from '@core/Book';
import {FlatList, StyleSheet, Text, View, ViewToken} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';

interface BookListProps {
  title: string | undefined;
  items: Book[];
  handleBook: (book: Book) => void;
  isRecentList?: boolean;
  noFlex?: boolean;
}

export const BookList = ({
  title,
  items,
  handleBook,
  isRecentList = false,
  noFlex = false,
}: BookListProps) => {
  const viewableItems = useSharedValue<ViewToken<Book>[]>([]);
  return (
    <View style={!noFlex && styles.container}>
      {title && <Text style={styles.sectionHeader}>{title}</Text>}
      <FlatList
        data={items}
        keyExtractor={item => item.isbn}
        onViewableItemsChanged={({viewableItems: vItems}) => {
          viewableItems.value = vItems;
        }}
        contentContainerStyle={styles.space}
        renderItem={({item}) => {
          return (
            <BookCard
              viewableItems={viewableItems}
              book={item}
              isRecent={isRecentList}
              handleBook={handleBook}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  space: {
    paddingBottom: 20,
  },
});

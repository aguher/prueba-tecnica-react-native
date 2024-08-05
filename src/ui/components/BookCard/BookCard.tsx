import {Book} from '@core/Book';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewToken,
} from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {useBooks} from 'ui/contexts/BooksContext';

interface BookCardProps {
  book: Book;
  handleBook: (book: Book) => void;
  isRecent: boolean;
  viewableItems: SharedValue<ViewToken<Book>[]>;
}

export const BookCard = ({
  book,
  handleBook,
  isRecent,
  viewableItems,
  ...props
}: BookCardProps) => {
  const {isFavorite} = useBooks();
  const rStyle = useAnimatedStyle(() => {
    const isVisible = Boolean(
      viewableItems.value
        .filter(item => item.isViewable)
        .find(viewableItem => viewableItem.item.isbn === book.isbn),
    );

    return {
      opacity: withTiming(isVisible ? 1 : 0),
      left: withSpring(isVisible ? 0 : 100),
    };
  }, []);
  return (
    <Animated.View style={rStyle}>
      <TouchableOpacity
        {...props}
        testID={`${book.isbn}-${isRecent ? 'recent' : 'no-recent'}`}
        onPress={() => handleBook(book)}
        style={styles.bookItem}>
        <Image
          accessibilityLabel="image"
          source={{
            uri: `https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`,
          }}
          style={styles.bookImage}
        />
        <Text style={styles.bookTitle}>{book.name}</Text>
        {isFavorite(book) && (
          <Text
            testID={`favorite-icon${isRecent ? 'recent' : ''}`}
            style={styles.favoriteIcon}>
            ★
          </Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
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
  favoriteIcon: {
    marginLeft: 'auto',
    color: 'gold',
  },
  bookTitle: {
    fontSize: 16,
  },
});

import {Book} from '@core/Book';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';

interface BookCardProps {
  book: Book;
  handleBook: (book: Book) => void;
  isRecent: boolean;
  isFavorite: boolean;
}

export const BookCard = ({
  book,
  handleBook,
  isRecent,
  isFavorite,
  ...props
}: BookCardProps) => {
  return (
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
      {isFavorite && (
        <Text
          testID={`favorite-icon${isRecent ? 'recent' : ''}`}
          style={styles.favoriteIcon}>
          ★
        </Text>
      )}
    </TouchableOpacity>
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

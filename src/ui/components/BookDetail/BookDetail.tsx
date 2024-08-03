import {Button} from '@components/index';
import {Book} from '@core/Book';
import {Linking, StyleSheet, Text, View} from 'react-native';

export const LABEL_ADD_FAVORITE = 'Agregar a favoritos';
export const LABEL_REMOVE_FAVORITE = 'Quitar de favoritos';
export const LABEL_OPEN_API = 'Abrir API en el navegador';
export const LABEL_CLOSE = 'Cerrar';

interface BookDetailProps {
  selectedBook: Book;
  handleFavorite: (book: Book) => void;
  isFavorite: boolean;
  onClose: () => void;
}
export const BookDetail = ({
  selectedBook,
  handleFavorite,
  isFavorite,
  onClose,
}: BookDetailProps) => {
  return (
    <View style={styles.bookDetail}>
      <Text style={styles.bookDetailTitle}>{selectedBook.name}</Text>
      <Text>{`Autor: ${selectedBook.authors.join(', ')}`}</Text>
      <Text>{`Editorial: ${selectedBook.publisher}`}</Text>
      <Text>{`Número de páginas: ${selectedBook.numberOfPages}`}</Text>
      <Text>{`Año de publicación: ${selectedBook.released}`}</Text>
      <Button
        type="PRIMARY"
        label={isFavorite ? LABEL_REMOVE_FAVORITE : LABEL_ADD_FAVORITE}
        onPress={() => handleFavorite(selectedBook)}
      />
      <Button label={LABEL_CLOSE} onPress={onClose} />
      <Button
        type="SUCCESS"
        label={LABEL_OPEN_API}
        onPress={() =>
          Linking.canOpenURL(selectedBook.url).then(() => {
            Linking.openURL(selectedBook.url);
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
});

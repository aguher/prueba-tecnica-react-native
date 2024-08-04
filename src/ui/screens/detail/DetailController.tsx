import {useParams} from 'ui/hooks/useParams';
import DetailScreen from './DetailScreen';
import {useBooks} from 'ui/contexts/BooksContext';

export const DetailController = () => {
  const {book} = useParams<'Detail'>();
  const {isFavorite, toggleFavorites} = useBooks();
  return (
    <DetailScreen
      selectedBook={book}
      isFavorite={isFavorite(book)}
      handleFavorite={toggleFavorites}
    />
  );
};

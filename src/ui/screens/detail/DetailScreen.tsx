import {BookDetail} from '@components/BookDetail';
import {Book} from '@core/Book';
import {useNavigator} from 'ui/hooks/useNavigator';
import {NavigationOptions} from 'ui/navigation/routes';

interface DetailScreenProps {
  handleFavorite: (book: Book) => void;
  selectedBook: Book;
  isFavorite: boolean;
}

export default function DetailScreen({
  handleFavorite,
  selectedBook,
  isFavorite,
}: DetailScreenProps) {
  const {goToHome} = useNavigator();
  return (
    <BookDetail
      handleFavorite={handleFavorite}
      onClose={() => goToHome()}
      selectedBook={selectedBook}
      isFavorite={isFavorite}
    />
  );
}

export const detailNavigationOptions: NavigationOptions = {
  headerShown: false,
};

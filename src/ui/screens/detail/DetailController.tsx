import {useParams} from 'ui/hooks/useParams';
import DetailScreen from './DetailScreen';

export const DetailController = () => {
  const {book, isFavorite} = useParams<'Detail'>();

  return (
    <DetailScreen
      selectedBook={book}
      isFavorite={isFavorite}
      handleFavorite={() => {}}
    />
  );
};

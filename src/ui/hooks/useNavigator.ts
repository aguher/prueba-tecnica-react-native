import {Book} from '@core/Book';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {NavigationParams} from 'ui/navigation/routes';

export const useNavigator = () => {
  const navigation = useNavigation<StackNavigationProp<NavigationParams>>();

  return {
    goToHome: () => navigation.replace('Home'),
    goToDetail: (book: Book) => navigation.navigate('Detail', {book}),
  };
};

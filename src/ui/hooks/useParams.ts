import {RouteProp, useRoute} from '@react-navigation/native';
import {NavigationParams, RouteName} from 'ui/navigation/routes';

export const useParams = <T extends RouteName>() => {
  const {params} = useRoute<RouteProp<NavigationParams, T>>();

  return params!;
};

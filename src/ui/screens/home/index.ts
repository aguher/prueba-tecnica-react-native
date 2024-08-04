import {Route} from 'ui/navigation/routes';
import {HomeController} from './HomeController';
import {homeNavigationOptions} from './HomeScreen';

export const Home: Route = {
  name: 'Home',
  component: HomeController,
  navigationOptions: homeNavigationOptions,
};

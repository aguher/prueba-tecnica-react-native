import {Route} from 'ui/navigation/routes';
import {DetailController} from './DetailController';
import {detailNavigationOptions} from './DetailScreen';

export const Detail: Route = {
  name: 'Detail',
  component: DetailController,
  navigationOptions: detailNavigationOptions,
};

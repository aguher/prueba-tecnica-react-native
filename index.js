import './gesture-handler';

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import MainApp from 'ui/MainApp';

AppRegistry.registerComponent(appName, () => MainApp);

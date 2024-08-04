import {Platform} from 'react-native';

export const headerSize =
  Platform.OS === 'ios'
    ? {
        headerStyle: {height: 75},
        headerStatusBarHeight: 20,
      }
    : {headerStyle: {height: 65}};

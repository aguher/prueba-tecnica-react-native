/* eslint-disable no-undef */
import 'react-native-gesture-handler/jestSetup';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('react-native-gesture-handler', () => {
  const gestureHandler = jest.requireActual('react-native-gesture-handler');
  gestureHandler.GestureHandlerRootView = ({children}) => children;
  return gestureHandler;
});

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

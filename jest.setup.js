/* eslint-disable no-undef */
import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-gesture-handler', () => {
  const gestureHandler = jest.requireActual('react-native-gesture-handler');
  gestureHandler.GestureHandlerRootView = ({children}) => children;
  return gestureHandler;
});

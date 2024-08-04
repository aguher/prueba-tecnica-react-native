import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {RootNavigator} from './navigation/RootNavigator';

interface MainAppProps {}

const MainApp = ({}: MainAppProps) => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default MainApp;

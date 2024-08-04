import {createStackNavigator} from '@react-navigation/stack';
import {RouteName, routes} from './routes';
import {headerSize} from './RootNavigator.model';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();
interface Props {
  initialRouteName?: RouteName;
  params?: object;
}

export const RootNavigator = ({initialRouteName = 'Home', params}: Props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{
          ...headerSize,
          headerShown: false,
        }}>
        {routes.map(route => (
          <Stack.Screen
            component={route.component}
            key={route.name}
            name={route.name}
            options={route.navigationOptions}
            initialParams={params}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

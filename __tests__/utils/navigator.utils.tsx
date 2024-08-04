import {QueryClient, QueryClientProvider} from 'react-query';
import {render} from '@testing-library/react-native';
import {NavigationParams, RouteName} from 'ui/navigation/routes';
import {RootNavigator} from 'ui/navigation';

export const renderScreen = <T extends RouteName>(
  route: T,
  initialParams?: NavigationParams[T],
) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 0,
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <RootNavigator initialRouteName={route} params={initialParams} />
    </QueryClientProvider>,
  );
};

import {QueryClient, QueryClientProvider} from 'react-query';
import {render} from '@testing-library/react-native';
import {NavigationParams, RouteName} from 'ui/navigation/routes';
import {RootNavigator} from 'ui/navigation';
import {BooksContext, BooksState} from 'ui/contexts/BooksContext';

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

export const renderScreenContext = <T extends RouteName>(
  route: T,
  context: BooksState = {
    recents: [],
    favorites: [],
    addRecent: () => {},
    toggleFavorites: () => {},
    isFavorite: _ => true,
    isSortingAsc: true,
    onSort: () => {},
  },
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
      <BooksContext.Provider value={context}>
        <RootNavigator initialRouteName={route} params={initialParams} />
      </BooksContext.Provider>
    </QueryClientProvider>,
  );
};

import React from 'react';

import {RootNavigator} from './navigation/RootNavigator';
import {QueryClient, QueryClientProvider} from 'react-query';
import {BooksProvider} from './contexts/BooksContext';

interface MainAppProps {}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 5000, //5 seconds cache
      staleTime: 5000, //5 seconds stale
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchInterval: false,
    },
  },
});

const MainApp = ({}: MainAppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <BooksProvider>
        <RootNavigator />
      </BooksProvider>
    </QueryClientProvider>
  );
};

export default MainApp;

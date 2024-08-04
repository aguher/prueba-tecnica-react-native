import React from 'react';
import {StackNavigationOptions} from '@react-navigation/stack';
import {Book} from '@core/Book';
import {Home} from '@screens/home';
import {Detail} from '@screens/detail';

export type NavigationParams = {
  Home: undefined;
  Detail: {book: Book; isFavorite: boolean};
};
export type RouteName = keyof NavigationParams;

export type NavigationOptions = StackNavigationOptions;

export interface Route {
  name: RouteName;
  component: React.ComponentType<any>;
  navigationOptions?: NavigationOptions;
}

export const routes: Route[] = [Home, Detail];

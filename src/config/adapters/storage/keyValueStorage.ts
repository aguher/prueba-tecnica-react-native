import AsyncStorage from '@react-native-async-storage/async-storage';
import isNil from 'lodash/isNil';

export const keyValueStorage = {
  set: async <T = any>(key: string, value: T) => {
    const encodedValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, encodedValue);
  },
  get: async <T = any>(key: string): Promise<T | undefined> => {
    const value = await AsyncStorage.getItem(key);
    if (isNil(value)) {
      return undefined;
    }

    return JSON.parse(value);
  },
  unset: (key: string) => AsyncStorage.removeItem(key),
};

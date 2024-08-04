import {keyValueStorage} from 'config/adapters/storage/keyValueStorage';

const ORDER_KEY = 'order_key';
export enum typeOrder {
  'ASCENDING' = 'ascending',
  'DESCENDING' = 'descending',
}
export const booksStorage = {
  setOrder: async (order: boolean) => {
    await keyValueStorage.set(
      ORDER_KEY,
      order ? typeOrder.ASCENDING : typeOrder.DESCENDING,
    );
  },

  getOrder: async (): Promise<typeOrder | undefined> => {
    return await keyValueStorage.get(ORDER_KEY);
  },
};

import {Book} from '../model';

export interface BookRepository {
  getAll: () => Promise<Book[]>;
}

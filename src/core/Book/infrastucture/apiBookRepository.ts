import {apiServer} from 'config/adapters/api/apiServer';
import {BookRepository} from '../domain/repositories/BookRepository';
import {ApiBook} from './interfaces';
import {BooksMapper} from './mappers/books.mapper';

export const apiBookRepository: BookRepository = {
  getAll: async () => {
    const {data} = await apiServer.get<ApiBook[]>('books');
    return BooksMapper.booksToEntity(data);
  },
};

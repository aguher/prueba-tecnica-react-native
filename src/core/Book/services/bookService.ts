import {apiBookRepository} from '../infrastucture/apiBookRepository';

export const bookService = {
  getAll: apiBookRepository.getAll,
};

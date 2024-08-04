import {BookDetail} from '@core/Book/domain';
import {ApiBook} from '../interfaces';

export class BookDetailMapper {
  static bookToEntity(apiBook: ApiBook): BookDetail {
    return {
      name: apiBook.name,
      authors: apiBook.authors,
      publisher: apiBook.publisher,
      numberOfPages: apiBook.numberOfPages,
      released: apiBook.released,
      isFavorite: false,
    };
  }
}

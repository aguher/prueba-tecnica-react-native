import {Book} from '@core/Book/domain';
import {ApiBook} from '../interfaces';

export class BooksMapper {
  static booksToEntity(books: ApiBook[]): Book[] {
    return books.map(book => ({
      name: book.name,
      authors: book.authors,
      publisher: book.publisher,
      numberOfPages: book.numberOfPages,
      released: book.released,
      characters: book.characters,
      country: book.country,
      isbn: book.isbn,
      mediaType: book.mediaType,
      povCharacters: book.povCharacters,
      url: book.url,
    }));
  }
}

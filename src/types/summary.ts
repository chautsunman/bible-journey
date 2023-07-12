import { Book, BOOKS } from "../bible/constants";

export class Summary {
  book: Book;

  constructor(book: Book) {
    this.book = book;
  }
}

export const INIT_SUMMARIES = BOOKS.map((book) => {
  return new Summary(book);
});

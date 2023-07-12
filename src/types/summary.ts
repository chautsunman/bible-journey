import { Book, getBookFromName } from "../bible/constants";

type BookSummaryMapType = {
  [key: string]: BookSummary;
};

type BookSummaryColorMapType = {
  [key: string]: string;
}

export class Summary {
  _books: BookSummaryMapType;

  private constructor(books: any) {
    this._books = books;
  }

  getBookSummary = (book: Book) => {
    if (book.name in this._books) {
      return this._books[book.name];
    } else {
      return BookSummary.newEmptyObj(book);
    }
  };

  static fromObj = (books: any) => {
    const bookSummaries: BookSummaryMapType = {};
    for (let bookKey in books) {
      const book = getBookFromName(bookKey);
      if (book) {
        bookSummaries[bookKey] = new BookSummary(book, books[bookKey].colors);
      }
    }
    return new Summary(bookSummaries);
  };

  static newEmptyObj = () => {
    return new Summary({});
  };
}

export class BookSummary {
  book: Book;
  colors: BookSummaryColorMapType;

  constructor(book: Book, colors: BookSummaryColorMapType) {
    this.book = book;
    this.colors = colors;
  }

  getChapterColor = (chapter: string) => {
    if (chapter in this.colors) {
      return this.colors[chapter];
    } else {
      return '#999999';
    }
  }

  static newEmptyObj = (book: Book) => {
    return new BookSummary(book, {});
  };
}

export const INIT_SUMMARY = Summary.newEmptyObj();

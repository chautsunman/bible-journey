import { Book } from "../bible/constants";

export class Summary {
  book: Book;
  color: string;

  constructor(book: Book, color: string) {
    this.book = book;
    this.color = color;
  }
}

import { BookChapter } from "../bible/constants";

export class RecordsFilter {
  bookChapterFilter?: BookChapter;

  constructor(bookChapterFilter?: BookChapter) {
    if (bookChapterFilter) {
      this.bookChapterFilter = bookChapterFilter;
    }
  }

  static getEmptyFilter = () => {
    return new RecordsFilter();
  };

  static createBookChapterFilter = (bookChapter: BookChapter) => {
    return new RecordsFilter(bookChapter);
  };
};

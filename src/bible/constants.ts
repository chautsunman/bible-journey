class Book {
  name: string;
  numChapters: number;

  private constructor(name: string, numChapters: number) {
    this.name = name;
    this.numChapters = numChapters;
  }

  static GENESIS: Book = new Book('Genesis', 50);
  static EXODUS: Book = new Book('Exodus', 40);
  static LEVITICUS: Book = new Book('Leviticus', 27);
  static NUMBERS: Book = new Book('Numbers', 36);
  static DEUTERONOMY: Book = new Book('Deuteronomy', 34);
  static JOSHUA: Book = new Book('Joshua', 24);
  static JUDGES: Book = new Book('Judges', 21);
  static RUTH: Book = new Book('Ruth', 4);
  static SAMUEL1: Book = new Book('1 Samuel', 31);
  static SAMUEL2: Book = new Book('2 Samuel', 24);
  static KINGS1: Book = new Book('1 Kings', 22);
  static KINGS2: Book = new Book('2 Kings', 25);
  static CHRONICLES1: Book = new Book('1 Chronicles', 29);
  static CHRONICLES2: Book = new Book('2 Chronicles', 36);
  static EZRA: Book = new Book('Ezra', 10);
  static NEHEMIAH: Book = new Book('Nehemiah', 13);
  static ESTHER: Book = new Book('Esther', 10);
  static JOB: Book = new Book('Job', 42);
  static PSALMS: Book = new Book('Psalms', 150);
  static PROVERBS: Book = new Book('Proverbs', 31);
  static ECCLESIASTES: Book = new Book('Ecclesiastes', 12);
  static SONGOFSONGS: Book = new Book('Song of Songs', 8);
  static ISIAH: Book = new Book('Isiah', 66);
  static JEREMIAH: Book = new Book('Jeremiah', 52);
  static LAMENTATIONS: Book = new Book('Lamentations', 5);
  static EZEKIEL: Book = new Book('Ezekiel', 48);
  static DANIEL: Book = new Book('Daniel', 12);
  static HOSEA: Book = new Book('Hosea', 14);
  static JOEL: Book = new Book('Joel', 3);
  static AMOS: Book = new Book('Amos', 9);
  static OBADIAH: Book = new Book('Obadiah', 1);
  static JONAH: Book = new Book('Jonah', 4);
  static MICAH: Book = new Book('Micah', 7);
  static NAHUM: Book = new Book('Nahum', 3);
  static HABAKKUK: Book = new Book('Habakkuk', 3);
  static ZEPHANIAH: Book = new Book('Zephaniah', 3);
  static HAGGAI: Book = new Book('Haggai', 2);
  static ZECHARIAH: Book = new Book('Zechariah', 14);
  static MALACHI: Book = new Book('Malachi', 4);
  static MATTHEW: Book = new Book('Matthew', 28);
  static MARK: Book = new Book('Mark', 16);
  static LUKE: Book = new Book('Luke', 24);
  static JOHN: Book = new Book('John', 21);
  static ACTS: Book = new Book('Acts', 28);
  static ROMANS: Book = new Book('Romans', 16);
  static CORINTHIANS1: Book = new Book('1 Corinthians', 16);
  static CORINTHIANS2: Book = new Book('2 Corinthians', 13);
  static GALATIANS: Book = new Book('Galatians', 6);
  static EPHESIANS: Book = new Book('Ephesians', 6);
  static PHILLIPIANS: Book = new Book('Phillipians', 4);
  static COLOSSIANS: Book = new Book('Colossians', 4);
  static THESSALONIANS1: Book = new Book('1 Thessalonians', 5);
  static THESSALONIANS2: Book = new Book('2 Thessalonians', 3);
  static TIMOTHY1: Book = new Book('1 Timothy', 6);
  static TIMOTHY2: Book = new Book('2 Timothy', 4);
  static TITUS: Book = new Book('Titus', 3);
  static PHILEMON: Book = new Book('Philemon', 1);
  static HEBREWS: Book = new Book('Hebrews', 13);
  static JAMES: Book = new Book('James', 5);
  static PETER1: Book = new Book('1 Peter', 5);
  static PETER2: Book = new Book('2 Peter', 3);
  static JOHN1: Book = new Book('1 John', 5);
  static JOHN2: Book = new Book('2 John', 1);
  static JOHN3: Book = new Book('3 John', 1);
  static JUDE: Book = new Book('Jude', 1);
  static REVELATION: Book = new Book('Revelation', 22);
}

const BOOKS = [
  Book.GENESIS,
  Book.EXODUS,
  Book.LEVITICUS,
  Book.NUMBERS,
  Book.DEUTERONOMY,
  Book.JOSHUA,
  Book.JUDGES,
  Book.RUTH,
  Book.SAMUEL1,
  Book.SAMUEL2,
  Book.KINGS1,
  Book.KINGS2,
  Book.CHRONICLES1,
  Book.CHRONICLES2,
  Book.EZRA,
  Book.NEHEMIAH,
  Book.ESTHER,
  Book.JOB,
  Book.PSALMS,
  Book.PROVERBS,
  Book.ECCLESIASTES,
  Book.SONGOFSONGS,
  Book.ISIAH,
  Book.JEREMIAH,
  Book.LAMENTATIONS,
  Book.EZEKIEL,
  Book.DANIEL,
  Book.HOSEA,
  Book.JOEL,
  Book.AMOS,
  Book.OBADIAH,
  Book.JONAH,
  Book.MICAH,
  Book.NAHUM,
  Book.HABAKKUK,
  Book.ZEPHANIAH,
  Book.HAGGAI,
  Book.ZECHARIAH,
  Book.MALACHI,
  Book.MATTHEW,
  Book.MARK,
  Book.LUKE,
  Book.JOHN,
  Book.ACTS,
  Book.ROMANS,
  Book.CORINTHIANS1,
  Book.CORINTHIANS2,
  Book.GALATIANS,
  Book.EPHESIANS,
  Book.PHILLIPIANS,
  Book.COLOSSIANS,
  Book.THESSALONIANS1,
  Book.THESSALONIANS2,
  Book.TIMOTHY1,
  Book.TIMOTHY2,
  Book.TITUS,
  Book.PHILEMON,
  Book.HEBREWS,
  Book.JAMES,
  Book.PETER1,
  Book.PETER2,
  Book.JOHN1,
  Book.JOHN2,
  Book.JOHN3,
  Book.JUDE,
  Book.REVELATION
];

const BOOKS_SET = new Set<Book>();
for (let i = 0; i < BOOKS.length; i++) {
  BOOKS_SET.add(BOOKS[i]);
}

const getBookFromName = (name: string) => {
  for (let i = 0; i < BOOKS.length; i++) {
    if (name === BOOKS[i].name) {
      return BOOKS[i];
    }
  }
  return null;
}

class BookChapter {
  book: Book;
  chapter: number;

  constructor(book: Book, chapter: number) {
    this.book = book;
    this.chapter = chapter;
  }

  toString() {
    return `${this.book.name} - ${this.chapter}`;
  }

  isValid() {
    return BOOKS_SET.has(this.book) && this.chapter > 0 && this.chapter <= this.book.numChapters;
  }

  static fromString(bookChapterStr: string) {
    const split = bookChapterStr.split(' - ');
    if (split.length !== 2) {
      return null;
    }
    const book = getBookFromName(split[0]);
    if (!book) {
      return null;
    }
    let chapter = -1;
    try {
      chapter = parseInt(split[1]);
    } catch {

    }
    if (chapter === -1) {
      return null;
    }
    const bookChapter = new BookChapter(book, chapter);
    if (!bookChapter.isValid()) {
      return null;
    }
    return bookChapter;
  }
}

export {
  Book,
  BOOKS,
  getBookFromName,
  BookChapter
};

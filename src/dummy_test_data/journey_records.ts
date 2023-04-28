import { selfType, fellowshipType, bsfType } from "./journey_types";

import JourneyRecord from "../types/journey_record";
import { Book, BookChapter } from "../bible/constants";

const genesis1Records = [
  new JourneyRecord('1', [new BookChapter(Book.GENESIS, 1)], null, null, selfType, 'genesis1'),
  new JourneyRecord('2', [new BookChapter(Book.GENESIS, 1)], null, null, selfType, 'genesis1'),
  new JourneyRecord('3', [new BookChapter(Book.GENESIS, 1)], null, null, fellowshipType, 'genesis1'),
  new JourneyRecord('4', [new BookChapter(Book.GENESIS, 1)], null, null, fellowshipType, 'genesis1'),
  new JourneyRecord('5', [new BookChapter(Book.GENESIS, 1)], null, null, bsfType, 'genesis1'),
]

const genesis2Records = [
  new JourneyRecord('6', [new BookChapter(Book.GENESIS, 2)], null, null, selfType, 'genesis2'),
  new JourneyRecord('7', [new BookChapter(Book.GENESIS, 2)], null, null, selfType, 'genesis2'),
  new JourneyRecord('8', [new BookChapter(Book.GENESIS, 2)], null, null, fellowshipType, 'genesis2'),
]

export {
  genesis1Records,
  genesis2Records
};

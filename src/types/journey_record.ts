import { DateTime } from 'luxon';

import { Book, BookChapter } from '../bible/constants';
import JourneyType from './journey_type';

class JourneyRecord {
  id: string;
  content: BookChapter[];
  readingDateStart: DateTime | null;
  readingDateEnd: DateTime | null;
  type: JourneyType;
  text: string;

  constructor(id: string, content: BookChapter[], readingDateStart: DateTime | null, readingDateEnd: DateTime | null, type: JourneyType, text: string) {
    this.id = id;
    this.content = content;
    this.readingDateStart = readingDateStart;
    this.readingDateEnd = readingDateEnd;
    this.type = type;
    this.text = text;
  }

  isValid = () => {
    if (!this.content.length) {
      return false;
    }
    if (this.readingDateStart !== null && this.readingDateEnd !== null && this.readingDateStart > this.readingDateEnd) {
      return false;
    }
    if (JourneyType.isInvalid(this.type)) {
      return false;
    }
    return true;
  }

  copy() {
    return new JourneyRecord(this.id, [...this.content], this.readingDateStart, this.readingDateEnd, this.type, this.text);
  }

  static newEmptyRecord = () => {
    return new JourneyRecord('newRecord', [new BookChapter(Book.GENESIS, 1)], null, null, JourneyType.INVALID_JOURNEY_TYPE, '');
  }
}

export default JourneyRecord;

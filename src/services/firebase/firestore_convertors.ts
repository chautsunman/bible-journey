import { FirestoreDataConverter } from "firebase/firestore";
import { DateTime } from "luxon";

import JourneyRecord from "../../types/journey_record";
import Settings from "../../types/settings";
import { BookChapter } from "../../bible/constants";
import JourneyType from "../../types/journey_type";
import { Summary } from "../../types/summary";

export const journeyRecordFirestoreConvertor: FirestoreDataConverter<JourneyRecord> = {
  toFirestore: (journeyRecord) => {
    // use journeyRecordToFirestore
    return {};
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    try {
      if ((!('content' in data)) || (!('readingDateStart' in data)) || (!('readingDateEnd' in data)) || (!('type' in data)) || (!('text' in data))) {
        throw new Error('cannot parse data to JourneyRecord');
      }
      const contentStrs = data['content'];
      const content = contentStrs.map((contentStr: string) => BookChapter.fromString(contentStr));
      const readingDateStartRaw = data['readingDateStart'];
      const readingDateStart = (readingDateStartRaw !== null) ? DateTime.fromMillis(parseInt(readingDateStartRaw)) : null;
      const readingDateEndRaw = data['readingDateEnd'];
      const readingDateEnd = (readingDateEndRaw !== null) ? DateTime.fromMillis(parseInt(readingDateEndRaw)) : null;
      const type = JourneyType.fromObj(data['type']);
      if (JourneyType.isInvalid(type)) {
        throw new Error('cannot parse data to JourneyRecord - invalid type');
      }
      const text = data['text'];
      const journeyRecord = new JourneyRecord(snapshot.id, content, readingDateStart, readingDateEnd, type, text);
      return journeyRecord;
    } catch (err) {
      throw new Error('cannot parse data to JourneyRecord');
    }
  }
};

export const journeyRecordToFirestore = (journeyRecord: JourneyRecord): any => {
  return {
    content: journeyRecord.content.map((bookChapter) => bookChapter.toString()),
    readingDateStart: (journeyRecord.readingDateStart) ? journeyRecord.readingDateStart.toMillis() : null,
    readingDateEnd: (journeyRecord.readingDateEnd) ? journeyRecord.readingDateEnd.toMillis() : null,
    type: journeyRecord.type.toObj(),
    text: journeyRecord.text
  };
};

export const settingsFirestoreConvertor: FirestoreDataConverter<Settings> = {
  toFirestore: (settings) => {
    return {};
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    try {
      if ((!('journeyTypes' in data))) {
        throw new Error('cannot parse data to Settings');
      }
      const journeyTypes = data['journeyTypes']
          .map((obj: any) => JourneyType.fromObj(obj))
          .filter((journeyType: JourneyType) => !JourneyType.isInvalid(journeyType));
      const settings = new Settings(journeyTypes);
      return settings;
    } catch (err) {
      throw new Error('cannot parse data to Settings');
    }
  }
};

export const summaryFirestoreConvertor: FirestoreDataConverter<Summary> = {
  toFirestore: (summary) => {
    return {};
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    try {
      const summary = Summary.fromObj(data.books);
      return summary;
    } catch (err) {
      throw new Error('cannot parse data to Summary');
    }
  }
};

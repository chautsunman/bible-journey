import { addDoc, collection, Firestore, getDocs, query, where } from 'firebase/firestore';

import { IService } from "./service_base";
import JourneyRecord from "../types/journey_record";
import { BookChapter } from "../bible/constants";
import { journeyRecordFirestoreConvertor, journeyRecordToFirestore } from './firebase/firestore_convertors';

class JourneyService implements IService {
  private firestore: Firestore;
  private uid: string;

  constructor(firestore: Firestore) {
    this.firestore = firestore;
  }

  init = (uid: string) => {
    this.uid = uid;
  }

  async getJourneysForBookChapter(bookChapter: BookChapter): Promise<JourneyRecord[]> {
    const journeys: JourneyRecord[] = [];
    if (!bookChapter.isValid()) {
      console.log('getJourneysForBookChapter - invalid bookChapter');
      return journeys;
    }
    const bookChapterStr = bookChapter.toString();
    console.log(`getJourneysForBookChapter - start, ${this.uid}, ${bookChapterStr}`);
    const journeysCollection = collection(this.firestore, 'journeys').withConverter(journeyRecordFirestoreConvertor);
    const journeysQuery = query(journeysCollection, where('uid', '==', this.uid), where('content', 'array-contains', bookChapterStr));
    const querySnapshot = await getDocs(journeysQuery);
    console.log(`getJourneysForBookChapter - get data, ${this.uid}, ${bookChapterStr}, ${querySnapshot.size}`);
    querySnapshot.forEach((doc) => {
      const journeyRecord = doc.data();
      journeys.push(journeyRecord);
    });

    return journeys;
  }

  async addJourney(journeyRecord: JourneyRecord) {
    try {
      const journeysCollection = collection(this.firestore, 'journeys');
      const data = journeyRecordToFirestore(journeyRecord);
      data.uid = this.uid;
      const docRef = await addDoc(journeysCollection, data);
      console.log(`addJourney - added, ${this.uid}, ${docRef.id}`);
      return true;
    } catch (err) {
      console.log('addJourney - err', err);
      return false;
    }
  }
}

export default JourneyService;

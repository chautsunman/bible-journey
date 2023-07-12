import { doc, Firestore, onSnapshot, Unsubscribe } from 'firebase/firestore';

import { summaryFirestoreConvertor } from "./firebase/firestore_convertors";
import { IService } from "./service_base";
import { Subscriber, Publisher } from "./subscription";

import { Summary, INIT_SUMMARY } from "../types/summary";

class SummaryService extends Publisher<Summary> implements IService {
  firestore: Firestore;
  uid: string;

  summary: Summary = INIT_SUMMARY;

  unsubscribeData: Unsubscribe;

  subscribers: Subscriber<Summary>[] = [];

  constructor(firestore: Firestore) {
    super();
    this.firestore = firestore;
  }

  init = (uid: string) => {
    this.uid = uid;
    this._subSummary(uid);
  }

  _subSummary = (uid: string) => {
    console.log('_subSummary', uid);
    const colorsDoc = doc(this.firestore, 'summary', uid).withConverter(summaryFirestoreConvertor);
    this.unsubscribeData = onSnapshot(colorsDoc, (doc) => {
      if (doc.exists()) {
        console.log('get summary data', this.subscribers.length);
        const data = doc.data()!;
        this.summary = data;
        this.subscribers.forEach((subscriber) => {
          subscriber.onData(this.summary);
        });
      }
    });
  }

  dispose() {
    if (this.unsubscribeData) {
      this.unsubscribeData();
    }
  }

  subscribe = (subscriber: Subscriber<Summary>) => {
    if (!(this.subscribers.includes(subscriber))) {
      this.subscribers.push(subscriber);
      subscriber.onData(this.summary);
      console.log('subscribe - subscribed SummaryService');
    } else {
      console.log('subscribe - subscribed before');
    }
  }

  unsubscribe = (subscriber: Subscriber<Summary>) => {
    const idx = this.subscribers.indexOf(subscriber);
    if (idx > -1) {
      this.subscribers.splice(idx, 1);
      console.log('unsubscribe - un-subscribed SummaryService');
    } else {
      console.log('unsubscribe - subscriber was not added before');
    }
  }
}

export default SummaryService;

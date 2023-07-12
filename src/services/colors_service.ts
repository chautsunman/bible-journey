import { doc, Firestore, onSnapshot, Unsubscribe } from 'firebase/firestore';

import { colorsFirestoreConvertor } from "./firebase/firestore_convertors";
import { IService } from "./service_base";
import { Subscriber, Publisher } from "./subscription";

import Colors from "../types/colors";

class ColorsService extends Publisher<Colors> implements IService {
  firestore: Firestore;
  uid: string;

  colors: Colors = Colors.newEmptyRecord();

  unsubscribeData: Unsubscribe;

  subscribers: Subscriber<Colors>[] = [];

  constructor(firestore: Firestore) {
    super();
    this.firestore = firestore;
  }

  init = (uid: string) => {
    this.uid = uid;
    this._subColors(uid);
  }

  _subColors = (uid: string) => {
    console.log('_subColors', uid);
    const colorsDoc = doc(this.firestore, 'colors', uid).withConverter(colorsFirestoreConvertor);
    this.unsubscribeData = onSnapshot(colorsDoc, (doc) => {
      if (doc.exists()) {
        console.log('get colors data', this.subscribers.length);
        const data = doc.data()!;
        this.colors = data;
        this.subscribers.forEach((subscriber) => {
          subscriber.onData(this.colors);
        });
      }
    });
  }

  dispose() {
    if (this.unsubscribeData) {
      this.unsubscribeData();
    }
  }

  subscribe = (subscriber: Subscriber<Colors>) => {
    if (!(this.subscribers.includes(subscriber))) {
      this.subscribers.push(subscriber);
      subscriber.onData(this.colors);
      console.log('subscribe - subscribed ColorsService');
    } else {
      console.log('subscribe - subscribed before');
    }
  }

  unsubscribe = (subscriber: Subscriber<Colors>) => {
    const idx = this.subscribers.indexOf(subscriber);
    if (idx > -1) {
      this.subscribers.splice(idx, 1);
      console.log('unsubscribe - un-subscribed ColorsService');
    } else {
      console.log('unsubscribe - subscriber was not added before');
    }
  }
}

export default ColorsService;

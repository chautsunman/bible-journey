import Settings from "../types/settings";

import { doc, Firestore, onSnapshot, setDoc, Unsubscribe } from 'firebase/firestore';

import { settingsFirestoreConvertor } from "./firebase/firestore_convertors";
import { IService } from "./service_base";
import { Subscriber, Publisher } from "./subscription";

class SettingsService extends Publisher<Settings> implements IService {
  firestore: Firestore;
  uid: string;

  settings: Settings = Settings.newEmptyRecord();

  unsubscribeData: Unsubscribe;

  subscribers: Subscriber<Settings>[] = [];

  constructor(firestore: Firestore) {
    super();
    this.firestore = firestore;
  }

  init = (uid: string) => {
    this.uid = uid;
    this._subSettings(uid);
  }

  _subSettings = (uid: string) => {
    console.log('_subSettings', uid);
    const settingsDoc = doc(this.firestore, 'settings', uid).withConverter(settingsFirestoreConvertor);
    this.unsubscribeData = onSnapshot(settingsDoc, (doc) => {
      if (doc.exists()) {
        console.log('get settings data', this.subscribers.length);
        const data = doc.data()!;
        this.settings = data;
        this.subscribers.forEach((subscriber) => {
          subscriber.onData(this.settings);
        });
      }
    });
  }

  dispose() {
    if (this.unsubscribeData) {
      this.unsubscribeData();
    }
  }

  subscribe = (subscriber: Subscriber<Settings>) => {
    if (!(this.subscribers.includes(subscriber))) {
      this.subscribers.push(subscriber);
      subscriber.onData(this.settings);
      console.log('subscribe - subscribed SettingsService');
    } else {
      console.log('subscribe - subscribed before');
    }
  }

  unsubscribe = (subscriber: Subscriber<Settings>) => {
    const idx = this.subscribers.indexOf(subscriber);
    if (idx > -1) {
      this.subscribers.splice(idx, 1);
      console.log('unsubscribe - un-subscribed SettingsService');
    } else {
      console.log('unsubscribe - subscriber was not added before');
    }
  }

  updateSettings = async (settings: Settings) => {
    try {
      if (!settings.isValid()) {
        console.log('updateSettings - invalid settings');
        return false;
      }
      console.log('updateSettings - start');
      const settingsDoc = doc(this.firestore, 'settings', this.uid);
      await setDoc(settingsDoc, {
        journeyTypes: [...settings.journeyTypes.map((journeyType) => journeyType.toObj())]
      });
      return true;
    } catch (err) {
      console.log('updateSettings - err', err);
      return false;
    }
  };
}

export default SettingsService;

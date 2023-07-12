const functions = require("firebase-functions");
require("firebase-functions/logger/compat");
const admin = require('firebase-admin');
const { addDoc, collection, deleteDoc, doc, Firestore, getDocs, query, where } = require('firebase/firestore');

admin.initializeApp();

const db = admin.firestore();

exports.updateColor = functions.firestore
    .document('journeys/{journeyId}')
    .onWrite(async (change, context) => {
      console.log(`updateColor - init - ${db}`);

      const journeyId = context.params.journeyId;

      let document = null;
      if (change.after.exists) {
        document = change.after.data();
      } else if (change.before.exists) {
        document = change.before.data();
      }

      if (document === null) {
        return;
      }

      const userId = document.uid;
      const content = document.content;
      console.log(`updateColor - get related journeys and colors - ${userId}, ${content.length}`);
      const colors = {};
      for (let i = 0; i < content.length; i++) {
        const bookChapterStr = content[i];
        colors[bookChapterStr] = [];
        console.log(`updateColor - get journeys start - ${userId}, ${bookChapterStr}`);
        const journeysCollection = collection(db, 'journeys');
        const journeysQuery = query(journeysCollection, where('uid', '==', userId), where('content', 'array-contains', bookChapterStr));
        const querySnapshot = await getDocs(journeysQuery);
        console.log(`updateColor - get journeys end - ${userId}, ${bookChapterStr}, ${querySnapshot.size}`);
        querySnapshot.forEach((doc) => {
          const journeyRecord = doc.data();
          if (journeyRecord.type && journeyRecord.type.color) {
            colors[bookChapterStr].push(journeyRecord.type.color);
          }
        });
        console.log(`updateColor - get colors - ${userId}, ${bookChapterStr}, ${querySnapshot.size}, ${colors[bookChapterStr].length}`);
      }
    });

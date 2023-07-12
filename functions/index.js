const functions = require("firebase-functions");
require("firebase-functions/logger/compat");
const admin = require('firebase-admin');

const {combineColors} = require('./colorUtils');

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

      const uid = document.uid;
      const content = document.content;
      console.log(`updateColor - get related journeys and colors - ${uid}, ${content.length}`);
      const colors = {};
      for (let i = 0; i < content.length; i++) {
        const bookChapterKey = content[i];
        colors[bookChapterKey] = [];
        console.log(`updateColor - get journeys start - ${uid}, ${bookChapterKey}`);
        const journeysCollection = db.collection('journeys');
        const journeysQuery = journeysCollection.where('uid', '==', uid).where('content', 'array-contains', bookChapterKey);
        const querySnapshot = await journeysQuery.get();
        console.log(`updateColor - get journeys end - ${uid}, ${bookChapterKey}, ${querySnapshot.size}`);
        querySnapshot.forEach((doc) => {
          const journeyRecord = doc.data();
          if (journeyRecord.type && journeyRecord.type.color) {
            colors[bookChapterKey].push(journeyRecord.type.color);
          }
        });
        console.log(`updateColor - get colors - ${uid}, ${bookChapterKey}, ${querySnapshot.size}, ${JSON.stringify(colors[bookChapterKey])}`);
      }

      const combinedColors = {};
      for (let bookChapterKey in colors) {
        if (colors[bookChapterKey].length) {
          combinedColors[bookChapterKey] = combineColors(colors[bookChapterKey]);
        }
      }
      console.log(`updateColor - combinedColors - ${uid}, ${JSON.stringify(combinedColors)}`);

      const summaryDocRef = db.collection('summary').doc(uid);
      const summaryDoc = await summaryDocRef.get();
      if (!summaryDoc.exists) {
        console.log(`updateColor - create user colors doc - ${uid}`);
        summaryDocRef.set({
          uid: uid,
          books: {}
        });
      } else {
        console.log(`updateColor - user colors doc exists - ${uid}}`);
      }
      const colorsUpdateObj = {};
      for (let bookChapterKey in combinedColors) {
        const bookKey = bookChapterKey.split(' - ')[0];
        const chapterKey = bookChapterKey.split(' - ')[1];
        colorsUpdateObj[`books.${bookKey}.colors.${chapterKey}`] = combinedColors[bookChapterKey];
      }
      console.log(`updateColor - colorsUpdateObj - ${uid}, ${JSON.stringify(colorsUpdateObj)}`);
      const updateColorsRes = await summaryDocRef.update(colorsUpdateObj);
      console.log(`updateColor - update colors - ${uid}, ${updateColorsRes}`);
    });

import * as functions from "firebase-functions";
const admin = require("firebase-admin");

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
admin.initializeApp();

export const createDocument = functions.https.onRequest(
  async (request, response) => {
    const documentId: string = "00000000";
    var query = await admin.firestore().collection("dev").get();
    query.forEach((doc: any) => {
      console.log(doc.id);
    });
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send(documentId);
  }
);

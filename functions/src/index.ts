import * as functions from "firebase-functions";
const admin = require("firebase-admin");

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
admin.initializeApp();

export const createDocument = functions.https.onRequest(
  async (request, response) => {
    var query = await admin
      .firestore()
      .collection("dev")
      .where("expiryTime", "<", new Date())
      .get();
    functions.logger.info(JSON.stringify(query));
    let documtets: Array<any> = [];
    query.forEach((doc: any) => {
      documtets.push(doc);
    });
    functions.logger.info("Documents Found", { documtets });
    response.send(documtets[0].id);
  }
);

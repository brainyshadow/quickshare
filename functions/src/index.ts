import * as functions from "firebase-functions";
const admin = require("firebase-admin");

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
const enviroment = functions.config().enviroment;

admin.initializeApp();
console.log(enviroment)
export const createDocument = functions.https.onRequest(
  async (request, response) => {

    var query = await admin
      .firestore()
      .collection(enviroment)
      .where("expiryTime", "<", new Date())
      .get();
    functions.logger.info(JSON.stringify(query));
    let documents: Array<any> = [];
    query.forEach((doc: any) => {
      documents.push(doc);
    });
    admin
      .firestore()
      .collection(enviroment)
      .doc(documents[0].id)
      .set({
        data: "",
        expiryTime: new Date(),
      })
      .then(() => {
        functions.logger.info("Document successfully written!");
      })
      .catch((error: any) => {
        functions.logger.info("Error writing document: ", error);
      });

    functions.logger.info("Documents Found", { documents });
    response.send(documents[0].id);
  }
);

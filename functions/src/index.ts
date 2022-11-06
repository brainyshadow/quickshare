import * as functions from "firebase-functions";
const admin = require("firebase-admin");

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
const enviroment = functions.config().config.enviroment;

admin.initializeApp();
console.log(enviroment);
export const createDocument = functions.https.onRequest(
  async (request, response) => {
    let documentId: string = "";
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

    documentId = typeof documents[0]?.id === "string" ? documents[0]?.id : "";

    console.log(documentId);
    if (documentId === "") {
      functions.logger.error("No Documents Found", { documents });
      response.status(500).send("No Documents Found");
    } else {
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
          functions.logger.info("Documents Found", { documents });
          response.send(documentId);
        })
        .catch((error: any) => {
          functions.logger.info("Error writing document: ", error);
          functions.logger.info("Error Clearing Document", { error });
          response.status(500).send("");
        });
    }
  }
);
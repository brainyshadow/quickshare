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
      response.set("Access-Control-Allow-Origin", "https://quick-share");
      let documentId = "";
      const query = await admin
          .firestore()
          .collection(enviroment)
          .where("expiryTime", "<", new Date())
          .limit(1)
          .get();
      const documents: Array<any> = [];
      query.forEach((doc: any) => {
        documents.push(doc);
      });
      documentId = typeof documents[0]?.id === "string" ? documents[0]?.id : "";
      if (documentId === "") {
        functions.logger.error("No Documents Found", {documents});
        response.status(500).send("No Documents Found");
      } else {
        const currentTime: Date = new Date();
        currentTime.setMinutes(currentTime.getMinutes() + 10);
        admin
            .firestore()
            .collection(enviroment)
            .doc(documents[0].id)
            .set({
              data: "",
              expiryTime: currentTime,
            })
            .then(() => {
              response.send(documentId);
              functions.logger.info("Document successfully written!");
            })
            .catch((error: any) => {
              functions.logger.info("Error writing document: ", error);
              functions.logger.info("Error Clearing Document", {error});
              response.status(500).send("");
            });
      }
    }
);

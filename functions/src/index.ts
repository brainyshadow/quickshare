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
      response.set("Access-Control-Allow-Origin", enviroment === "prod" ? "https://quick-share.net" : "*");
      let documentId = "";
      const query = await admin
          .firestore()
          .collection(enviroment)
          .where("expiryTime", "<", new Date())
          .limit(1)
          .get();
      admin
          .firestore()
          .collection("analytics")
          .doc(enviroment)
          .update({
            numberOfWrites: admin.firestore.FieldValue.increment(1),
          });
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
            .firestore(documentId)
            .collection(enviroment)
            .doc()
            .set({
              data: "",
              expiryTime: currentTime,
            })
            .then(() => {
              response.send(documentId);
              functions.logger.info("Document successfully written!");
            })
            .catch((error: any) => {
              functions.logger.error("Error Clearing Document: ", error);
              response.status(500).send("Error Clearing Document");
            });
      }
    }
);

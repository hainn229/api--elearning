const admin = require("firebase-admin");
const firebaseAccount = require("./elearning-305907-firebase-adminsdk-h7r3m-6301490520.json");
// Initialize firebase admin SDK
admin.initializeApp({
  credential: admin.credential.cert(firebaseAccount),
  storageBucket: "gs://elearning-305907.appspot.com",
});

// Cloud storage
const bucket = admin.storage().bucket();

module.exports = {
  bucket,
};

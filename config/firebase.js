const admin = require("firebase-admin");
require("dotenv").config();
const { firebase } = require("./config");
// Initialize firebase admin SDK
admin.initializeApp({
  credential: admin.credential.cert(firebase),
  storageBucket: process.env.STORAGE_BUCKET,
});


// Cloud storage
const bucket = admin.storage().bucket();

module.exports = {
  bucket,
};

const config = require('config');
const admin = require("firebase-admin");

// Initialize firebase admin SDK
admin.initializeApp({
    credential: admin.credential.cert(config.get('firebase.ADMIN_SDK')),
    storageBucket: "config.get('firebase.STORAGE_BUCKET')",
});

// Cloud storage
const bucket = admin.storage().bucket();

module.exports = {
    bucket,
};
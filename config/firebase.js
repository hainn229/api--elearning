const admin = require("firebase-admin");
const firebaseAccount = require("./elearning-305907-firebase-adminsdk-h7r3m-6301490520.json");
// Initialize firebase admin SDK
admin.initializeApp({
    credential: admin.credential.cert({
        "type": "service_account",
        "project_id": "elearning-305907",
        "private_key_id": "6301490520d5f39a650e4a46817d4a3b28290ee7",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCUMXaiGv1zY1/4\nGlm0eBEMOmVnIyIjfv05nGTxaUEdvv/62ah3m3Ozvye86OBYJ2KXeE21P+0aa0D0\nLIj+n4JAS7mc8151gEDoX7asV+kd7QM5DS7QuXjF01+FqnvtJ0Y7lkEi4IJhz+Y3\nuIlKVWuQR8VsacNzAesu4a5UIPxti2UzssgMGiTtmEkuvKvfg9PjCUj2mEx0iXnl\nZyw/EeQSjqwq0LJgB0Ig1JErjRXv/21j2GDe5910+rvoA8nh3Ep9UgGC/7rbBcU0\nmORjAonYbQiucdJCLlht4YGOhN41CcNowZdMoEqizPWSznKyEp90tmGWoHwez7nO\nhrB1Vim9AgMBAAECggEADjqLlff6ctxNSCCbkVjf5ikrOFJmwjq8rI3oIUfGYUlI\nAblpVAagftcxRRGlDMHHVRzPdUIsjVdT9r3Z73y4QF0k9r1lSenlEYqzGuwb7Wwm\n3ZD2+EJ+ppvrdYWPfY9CTpFYMrWUvzh7dckpoXH/MGy7t3OWORIrlyZDGz/JjOjq\ndRRCD9kQKlhmZYk9c2aXtUpPGhBsxsPSlm1d/TA+YXrudXtgVFPwDYMoWOdCXCLa\nQaFcQTsMGBQIOM0zC670nJ4sJ411bU8T++5ScDy22eqCK9KvaOr0skb745O2LJrH\n5E4upkA4q7mQbudSY/o7ChZa3ZS60AUYj1kKkgK0DwKBgQDPu6gWzhmg35Dt9Moo\ntoDtNOzhDtuoSH1XOpyr1YFu+DAkf3aGtSZwJ1d/15eJ62ekijEbbKvGPYr2UIBr\nKI1rRwtGp/0oA6M8Ey4MxKDvtZfDhN8FtIPzecK/x6rRP5LRiE5Gi7hMosPPtpVj\nornzrqUGzFOPIN6SGXKg4KqdbwKBgQC2oETSuGSOP+yY4nPDjmR5xopl0LBM5gb+\ntpdOFbTYi1rE6/GaCHrPwmUMxNnkU056QCuzRGm5ZUgX5qpz3RbMWjAo731Q7GXM\ne0ELoUN49Bf3i6BL41mnUaoHlkBb6ZELGNBxBKY13E5icGbQzV+WIzd03vGDu+V0\nlLC3J0LtkwKBgQCUqMKdr1h/2/4njCqwAAs7tchfNvbS8y1foz5DakN6Wnp5ZA46\nUKD1WfIwNuTnemNtSMfjzF0RPTGZG/sKtLafsvPK2KU+YXwLnd4ynPRfFyFIdmnz\n9z8GmnhYLld773buJBGAQrTdgw2GNC+sYeOZE75doxOZNfiRrUxu/NicWQKBgA9j\n9EjZ10eRpYvA0cayMk985t7rtl/UptRCaP/gnmv9Wnnr9GFpw4fMtx1bXY17Y8qz\nq7sg0dQY7/lrrAO1px0zoIlinWn7chzIalPjlD8WOwrWjny2vTB3ll+rTuMwDNQl\nlDNiE+vIFCcBl/iSxjJt51eHDk1uwUiQ20+kFGTXAoGAPJnHnZLnsW41WLRd251z\nY1NT9NFWDFt5bYA/BP32ynwJRukb4gKAWb6YDkE08c51KUDrVyaTATOEttMI2y21\nsOgKVLw5SRBclwl1NHBL/ONBzTaXVfv8Z7pSjLuJsIoZMN8/V0z5CQYt/Mi2ajrA\nP73t0/Z0PzlSHyifd5c/gLE=\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-h7r3m@elearning-305907.iam.gserviceaccount.com",
        "client_id": "104642779359840115082",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-h7r3m%40elearning-305907.iam.gserviceaccount.com"
    }),
    storageBucket: "gs://elearning-305907.appspot.com",
});

// Cloud storage
const bucket = admin.storage().bucket();

module.exports = {
  bucket,
};

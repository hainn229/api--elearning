module.exports = {
    app: {
        PORT: process.env.PORT || 5000,
        MONGODB_SRV: 'mongodb+srv://UN_admin_elearning1:PW_admin_elearning1@elearning.emrrd.mongodb.net/elearningDB?retryWrites=true&w=majority'
    },
    firebase: {
        ADMIN_SDK: {
            "type": "service_account",
            "project_id": "elearning-ed74f",
            "private_key_id": "c3e832f5f3bcc8c672b456b2e333962e9ee7b17a",
            "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDSqQO6ic5lW9CZ\n2qMdLUV9aRAC4Js/eyntfHuhu6WwDpMd+nNRoLyLODJwYMDdnoGC2IB8YdACEAaj\nYtOx1nrCpS1wrbRS+WxEEPXCjprS6zZ8SlqtkMtS8ul7MBBK0b4mtGoN7Tp2tFW+\nnju/AmBgGQrrBG4Zc+DM2rNCcjzYbwMD6m5oaEKQJFn93MC0yFWSLB97pep1Mm8Y\nuyKeFE2iDdXualF08N7a/PFT0+M+0cdwgx84vXu/8kQfhRS9nWCSAgZ5k0nAEd3x\nAoPsGD3Oxu/fYLdqDeQurc0dIMf7hyltTtlsHeTQ9Zylr+NYwr/kvkJkVLxVriOY\nJjClqcGXAgMBAAECggEAAOmylnBacJ4BPWlxI4M6tdxqsVh/07qY5+qOLpk9kpG9\nmXeoYEYuCvxnW41PyKYTMZn2lJNn71pabQLUoASp64YDuGVITsO98F2ScxFjIl7a\nkZdQ5UenWeirklkW+PwHsus9Omo4wqLtbDILWDyOZlw1a+dNAtc5timMdVFBaj6u\n498eY1nyXtjL4SjKxv/Ihsqq1PMI1pZEYWsnp6vQqmD8O91aN9AoPQa8sW9aPjVh\nO0vTQnr2EXXmE4eL4TArMerPTlwPIb/ig0afd7gn1J8tb+7L0fyecy1ogzqHzCY/\ny7TKriKgbint5yVdH9fKygPfxsx+qESFWldfQt5HAQKBgQD64O95eATA8RRmK3jz\nokeLXwSiD8d0v2Vl9bDCeWEeWiaVHdJ+TXfYlHibnnc2EMHoLIf2tVRo5EjsqI9X\nwsj+IVRuZVbe92MFiAGkkzPbEIoGVytykx8g+1ISNwP0kAuG62zMIugn04DEvv3n\nA8UcrLaR2ZP3xa6bvspZEVmWYQKBgQDW9ebkSjpK0krKZZ2MW+nH4POMMH8aG5Cr\nrHkuuQI0g7YGW8htJVTr+B3TwCNG0KfQO9ExQIHRk5QgF8Avsqxgj1JZuqrY7aAv\ns7KuXNZeb87jH28ugABlo0LFJEVdn7j64rSiFY2RAopqw0zIw/Byt26jUNF7wzfC\nkJexgOXq9wKBgHnzN1VTavQi/CiB/0Rm4OI1qPniM7FjjDWYzXhrKjNn3RNlMLnm\njFhCK7JxwD8OvENQyjK5iDOIrI4ljbA6ZhtqNjGHn0e493Br4WiPiYh2LLHSU7NZ\nIquUnxttlMWf84p9DCDa4wDhBdodgSx3n6xFpGWXXx70/+CDSLctAOBhAoGANxFV\nrgQJ/OL0f/caLjvZnvfUzIQb+382R5RukvaYRwW62tQmezeGEtFEKtvc7aZEZ0b7\np0dkOmE5ICOVe2KlYDM3IH9+hwYQ9EdvrdVgoV65PFvwKpRmBaOWVlSdZIenZrYv\nGhq1YoGpHgKcKA5yCaFOOY5Zq//tx+0svy9LNy8CgYAx7ZlhfNb5sDWYNxg+pWu4\nj9i0BPMpCqdzteCsovW1BeTTbp1l7QGWeYhD6cHua8AEjgI+FOnjRHO4YRRJMpV9\nUHdz+CNUkM5N7cmbrcDlWhRzTKbkqCxifpbUkrSdInpsYfOAFALDkn/NXoxnVkWL\nfplnbhztrD0r0nU4rLWwpg==\n-----END PRIVATE KEY-----\n",
            "client_email": "firebase-adminsdk-wfnsj@elearning-ed74f.iam.gserviceaccount.com",
            "client_id": "103803414129861953605",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-wfnsj%40elearning-ed74f.iam.gserviceaccount.com"
        },
        STORAGE_BUCKET: 'gs://elearning-ed74f.appspot.com'
    },
    jwt: {
        JWT_SECRET: 'hainn229_elearning@2021'
    },
    auth_google: {

    }
};
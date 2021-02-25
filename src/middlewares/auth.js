const UsersModel = require('../models/users');
const {
    verifyToken
} = require('../services/users');

module.exports.checkAuth = (required) => {
    return (req, res, next) => {
        if (!req.headers.authorization) {
            if (required) {
                res.status(401).send('Could not find token!');
            } else {
                next();
            }
        }
        const token = req.headers.authorization.split(' ')[1];
        try {
            const object = verifyToken(token);
            const email = object.iss;
            UsersModel.findOne({
                email: email
            }).exec().then((user) => {
                req.user = user.doc;
                next();
            }).catch(() => {
                res.status(401).send('Could not find user!');
            });
        } catch {
            if (required) {
                res.status(401).send('Invalid token!');
            } else {
                next();
            };
        };
    };
};
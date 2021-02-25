const config = require('config');
const jwt = require('jsonwebtoken');
const UsersModel = require('../models/users');
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Jsonwebtoken
const Token = (id, email, role) => {
    return jwt.sign({
        id: id,
        iss: email, // issuer of the jwt.
        sub: role, // subject of the jwt.
        exp: new Date().setDate(new Date().getDate() + 3), // time after which the jwt expires.
        iat: new Date().getTime() // time at which the jwt was issued, determine age of the jwt.
        // aud: ...
        // nbf: ...
        // jti: ...
    }, config.get('jwt.JWT_SECRET'));
};

module.exports.verifyToken = (token) => {
    return jwt.verify(token, config.get('jwt.JWT_SECRET'));
};

// Users
module.exports.register = async (userInfo) => {
    try {
        const salt = await bcrypt.genSalt(10);
        userInfo.password = await bcrypt.hash(userInfo.password, salt);
        const newUser = new UsersModel(userInfo);
        await newUser.save();
    } catch (error) {
        throw error;
    };
};

module.exports.getMyInfo = async (id) => {
    const myInfo = await UsersModel.findById(id);
    return myInfo;
};

module.exports.login = async (email, password) => {
    const user = await UsersModel.findOne({
        email: email
    });
    const match = await bcrypt.compare(password, user.password);
    if (user && match) {
        return {
            userInfo: user,
            token: Token(user.email, user.password, user.role)
        };
    };
};

module.exports.findUserByEmail = async (email) => {
    const user = await UsersModel.findOne({
        email: email
    });
    return user;
};

module.exports.resetPassword = async (email, updatePassword) => {
    try {
        const salt = await bcrypt.genSalt(10);
        updatePassword = await bcrypt.hash(updatePassword, salt);
        await UsersModel.updateOne({
            email: email
        }, {
            password: updatePassword
        });
    } catch (err) {
        throw err;
    };
};

// Passport
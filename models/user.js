const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const AuthorizationErr = require('../middleware/errors/authorization-err');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 30,
        required: true,
    },
    password: {
        type: String,
        length: 62,
        required: true,
        select: false,
    },
    email: {
        type: String,
        validate: [validator.isEmail, 'invalid email'],
        required: true,
        unique: true,
    },
    about: {
        type: String,
        minlength: 2,
        maxlength: 30,
        required: true,
    },
    avatar: {
        type: String,
        validate: [validator.isURL, 'invalid url'],
        required: true,
    },
});

userSchema.statics.findUserByCredentials = function (email, password) {
    return this.findOne({ email }).select('+password')
        .then((user) => {
            if (!user) {
                return Promise.reject(new AuthorizationErr('Incorrect email or password'));
            }
            return bcrypt.compare(password, user.password)
                .then((matched) => {
                    if (!matched) {
                        return Promise.reject(new AuthorizationErr('Incorrect email or password'));
                    }
                    return user;
                });
        });
};

module.exports = mongoose.model('user', userSchema);

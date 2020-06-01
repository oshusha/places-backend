const objectId = require('mongodb').ObjectID;
const User = require('../models/user');
const AuthorizationErr = require('./errors/authorization-err');
const InternalServerError = require('./errors/internal-server-err');

async function upUser(req, res, next) {
    if (objectId.isValid(req.user._id)) {
        const user = await User.findById(req.user._id);
        try {
            if (user == null) {
                throw new AuthorizationErr('Hacking attempt');
            }
        } catch (err) {
            next(new InternalServerError('err.message'));
        }

        res.user = user;
    }
    next();
}
module.exports = { upUser };

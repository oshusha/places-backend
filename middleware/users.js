const objectId = require('mongodb').ObjectID;
const User = require('../models/user');
const NotFoundErr = require('./errors/not-found-err');


async function getUser(req, res, next) {
    if (objectId.isValid(req.params.id)) {
        const user = await User.findById(req.params.id);
        try {
            if (user == null) {
                throw new NotFoundErr('User not found');
            }
        } catch (err) {
            next(new NotFoundErr('User not found'));
        }

        res.user = user;
    }
    next();
}
module.exports = { getUser };

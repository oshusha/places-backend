const jwt = require('jsonwebtoken');
const AuthorizationErr = require('./errors/authorization-err');

module.exports = (req, res, next) => {
    if (!req.cookies.jwt) {
        throw new AuthorizationErr('Authorization required!');
    }

    const token = req.cookies.jwt;

    let payload;
    try {
        payload = jwt.verify(token, process.env.JWTSECRET);
    } catch (err) {
        const e = new AuthorizationErr('Authorization required!');
        next(e);
    }
    req.user = payload;
    next();
};

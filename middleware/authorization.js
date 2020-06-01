const jwt = require('jsonwebtoken');
const AuthorizationErr = require('./errors/authorization-err');

module.exports = (req, res, next) => {
    if (!req.cookies.jwt) {
        throw new AuthorizationErr('Authorization required');
    }

    const token = req.cookies.jwt;

    let payload;
    try {
        payload = jwt.verify(token, process.env.JWTSECRET || 'defone');
    } catch (err) {
        next(new AuthorizationErr('Authorization required'));
    }
    req.user = payload;
    next();
};

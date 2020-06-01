// eslint-disable-next-line consistent-return,no-shadow
const error = ((err, req, res, next) => {
    const { statusCode = 500, message } = err;
    res
        .status(statusCode)
        .send({ message: statusCode === 500 ? 'Internal server error' : message });
    next();
});

module.exports = error;

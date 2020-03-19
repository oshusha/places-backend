// eslint-disable-next-line consistent-return,no-shadow
const error = (error, req, res, next) => {
  if (error) {
    return res.status(400)
      .json(error);
  }
  next();
};

module.exports = error;

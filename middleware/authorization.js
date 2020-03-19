const authorization = (req, res, next) => {
  req.user = { _id: '5e73f64b66555f304dd615ed' };
  next();
};

module.exports = authorization;

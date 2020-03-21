const authorization = (req, res, next) => {
  req.user = { _id: '5e753f569dd1a703191eb7b9' };
  next();
};

module.exports = authorization;

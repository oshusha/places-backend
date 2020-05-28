const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    return res.status(401).send({ message: 'Authorization required!' });
  }

  const token = req.cookies.jwt;

  let payload;
  try {
    payload = jwt.verify(token, 'napoleon');
  } catch (err) {
    return res.status(401).send({ message: 'Authorization required!' });
  }
  req.user = payload;
  next();
  return 0;
};

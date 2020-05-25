// const authorization = (req, res, next) => {
//   req.user = { _id: '5e753f569dd1a703191eb7b9' };
//   next();
// }

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    return res.status(401).send({message: "Необходима авторизация!"});
  }

  const token = req.cookies.jwt;

  let payload;
  try {
    payload = jwt.verify(token, 'napoleon');
  } catch (err) {
    return res.status(401).send({message: "Необходима авторизация!"});
  }
  req.user = payload;
  next();
};

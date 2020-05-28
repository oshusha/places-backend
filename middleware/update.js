const objectId = require('mongodb').ObjectID;
const User = require('../models/user');

async function upUser(req, res, next) {
  if (objectId.isValid(req.user._id)) {
    const user = await User.findById(req.user._id);
    try {
      if (user == null) {
        res.status(401).json({ message: 'Hacking attempt!' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }

    res.user = user;
  }
  next();
}
module.exports = { upUser };

const objectId = require("mongodb").ObjectID;
const User = require("../models/user");

async function getUser(req, res, next) {
  if (objectId.isValid(req.params.id)) {
    const user = await User.findById(req.params.id);
    try {
      if (user == null) {
        await res.status(404).json({ message: "Not Found" });
      }
    } catch (err) {
      await res.status(500).json({ message: err.message });
    }

    res.user = user;
  } else {
    res.status(404).json({ message: "Invalid user id" });
  }
  next();
}
module.exports = { getUser };

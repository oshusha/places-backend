const User = require("../models/user");

module.exports.get = async (req, res) => {
  try {
    const users = await User.find();
    await res.json({ data: users });
  } catch (err) {
    await res.status(500).json({ message: err.message });
  }
};

module.exports.post = async (req, res) => {
  const user = new User({
    name: req.body.name,
    about: req.body.about,
    avatar: req.body.avatar
  });

  try {
    const newUser = await user.save();
    await res.status(201).json({ data: newUser });
  } catch (err) {
    await res.status(400).json({ message: err.message });
  }
};

module.exports.delete = async (req, res) => {
  try {
    await res.user.delete();
    res.json({ message: "Successfully deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.update = async (req, res) => {
  if (req.body.name != null) {
    res.user.name = req.body.name;
  }
  if (
    req.body.avatar != null &&
    req.originalUrl
      .split("/")
      .slice(-1)
      .join("") === "avatar"
  ) {
    res.user.avatar = req.body.avatar;
  }
  if (req.body.about != null) {
    res.user.about = req.body.about;
  }

  try {
    const updatedUser = await res.user.save({
      new: true,
      runValidators: true
    });
    res.json({ data: updatedUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

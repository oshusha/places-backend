const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/user");

module.exports.get = async (req, res) => {
  try {
    const users = await User.find();
    await res.json({data: users});
  } catch (err) {
    await res.status(500).json({message: err.message});
  }
};

module.exports.post = async (req, res) => {
  const saltRounds = 10;
  const password = await bcrypt.hash(req.body.password, saltRounds);
  const user = new User({
    name: req.body.name,
    password: password,
    email: req.body.email,
    about: req.body.about,
    avatar: req.body.avatar
  });
  try {
    const newUser = await user.save();
    await res.status(201).json({data: newUser});
  } catch (err) {
    await res.status(400).json({message: err.message});
  }
};

module.exports.delete = async (req, res) => {
  try {
    if (res.user._id == req.user._id) {
      await res.user.delete();
      res.json({message: "Successfully deleted"});
    } else {
      res.json({message: "Permission denied!"});
    }
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

module.exports.update = async (req, res) => {
  if (res.user._id == req.user._id) {
    if (req.body.name != null) {
      res.user.name = req.body.name;
    }
    if (req.body.about != null) {
      res.user.about = req.body.about;
    }
  } else {
    res.json({message: "Permission denied!"});
  }
  try {
    const updatedUser = await res.user.save({
      new: true,
      runValidators: true
    });
    res.json({data: updatedUser});
  } catch (err) {
    res.status(400).json({message: err.message});
  }
};

module.exports.updateAvatar = async (req, res) => {
  if (req.body.avatar !== null) {
    res.user.avatar = req.body.avatar;
  }

  try {
    const updatedUser = await res.user.save({
      new: true,
      runValidators: true
    });
    res.json({data: updatedUser});
  } catch (err) {
    res.status(400).json({message: err.message});
  }
};

module.exports.login = (req, res) => {
  const {email, password} = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id },"napoleon");
      res.cookie('jwt',token, { httpOnly: true, maxAge: 604800 * 1000 });
      res.send({message: "Авторизация прошла успешно!"});
    })
    .catch((err) => {
      res.status(401).json({message: err.message});
    });
}

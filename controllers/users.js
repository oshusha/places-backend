const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.get = async (req, res) => {
  try {
    const users = await User.find();
    await res.json({ data: users });
  } catch (err) {
    await res.status(500).json({ message: err.message });
  }
};

module.exports.post = async (req, res) => {
  try {
    if (req.body.password.length < 8) {
      await res.status(400).json({ message: 'Password must be at least 8 characters!' });
    }
    const saltRounds = 10;
    const cpassword = await bcrypt.hash(req.body.password, saltRounds);
    const user = new User({
      name: req.body.name,
      password: cpassword,
      email: req.body.email,
      about: req.body.about,
      avatar: req.body.avatar,
    });
    await user.save();
    await res.status(201).json({ message: 'Кegistration successful!' });
  } catch (err) {
    await res.status(400).json({ message: err.message });
  }
};

module.exports.update = async (req, res) => {
  if (req.body.name != null) {
    res.user.name = req.body.name;
  }
  if (req.body.about != null) {
    res.user.about = req.body.about;
  }
  try {
    const updatedUser = await res.user.save({
      new: true,
      runValidators: true,
    });
    res.json({ data: updatedUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports.updateAvatar = async (req, res) => {
  if (req.body.avatar !== null) {
    res.user.avatar = req.body.avatar;
  }
  try {
    const updatedUser = await res.user.save({
      new: true,
      runValidators: true,
    });
    res.json({ data: updatedUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'napoleon', { expiresIn: '7d' });
      res.cookie('jwt', token, { httpOnly: true, maxAge: 604800 * 1000 });
      res.send({ message: 'Авторизация прошла успешно!' });
    })
    .catch((err) => {
      res.status(401).json({ message: err.message });
    });
};

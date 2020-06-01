const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestErr = require('../middleware/errors/bad-request-err');
const InternalServerErr = require('../middleware/errors/internal-server-err');
const AuthorizationErr = require('../middleware/errors/authorization-err');


module.exports.get = async (req, res, next) => {
    try {
        const users = await User.find();
        await res.json({ data: users });
    } catch (err) {
        next(new InternalServerErr(err.message));
    }
};

module.exports.post = async (req, res, next) => {
    try {
        if (req.body.password.length < 8) {
            next(new BadRequestErr('Password must be at least 8 characters'));
        } else {
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
            await res.status(201).json({ message: 'Registration successful' });
        }
    } catch (err) {
        next(new BadRequestErr(err.message));
    }
};

module.exports.update = async (req, res, next) => {
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
        next(new BadRequestErr(err.message));
    }
};

module.exports.updateAvatar = async (req, res, next) => {
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
        next(new BadRequestErr(err.message));
    }
};

module.exports.login = (req, res, next) => {
    const { email, password } = req.body;
    return User.findUserByCredentials(email, password)
        .then((user) => {
            const token = jwt.sign({ _id: user._id }, process.env.JWTSECRET || 'defone', { expiresIn: '7d' });
            res.cookie('jwt', token, { httpOnly: true, maxAge: 604800 * 1000 });
            res.send({ message: 'Successful authorization' });
        })
        .catch(() => {
            next(new AuthorizationErr('Incorrect email or password'));
        });
};

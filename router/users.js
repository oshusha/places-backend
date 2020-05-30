const express = require('express');

const router = express.Router();

const NotFoundErr = require('../middleware/errors/not-found-err');
const users = require('../controllers/users');
const { getUser } = require('../middleware/users');
const { upUser } = require('../middleware/update');
const { get, update, updateAvatar } = require('../middleware/validate/users');

// Get All Users
router.get('/', users.get);

// Get one user
router.get('/:id', get, getUser, (req, res) => {
    if (res.user) {
        res.status(200).json(res.user);
    } else {
        throw new NotFoundErr('User not found!');
    }
});

// Update info
router.patch('/me', update, upUser, users.update);

// Update avatar
router.patch('/me/avatar', updateAvatar, upUser, users.updateAvatar);

module.exports = router;

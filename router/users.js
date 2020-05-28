const express = require('express');

const router = express.Router();

const users = require('../controllers/users');
const { getUser } = require('../middleware/users');
const { upUser } = require('../middleware/update');

// Get All Users
router.get('/', users.get);

// Get one user
router.get('/:id', getUser, (req, res) => {
    if (res.user) {
        res.json(res.user);
    }
});

// Update info
router.patch('/me', upUser, users.update);

// Update avatar
router.patch('/me/avatar', upUser, users.updateAvatar);

module.exports = router;

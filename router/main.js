const router = require('express').Router();
const { post, login } = require('../controllers/users');
const authorization = require('../middleware/authorization');
const users = require('./users');
const cards = require('./cards');

router.post('/signin', login);
router.post('/signup', post);

router.use(authorization);

router.use('/users', users);
router.use('/cards', cards);
router.all('*', (req, res) => {
    res.status(404).json({ message: 'Not found!' });
});

module.exports = router;

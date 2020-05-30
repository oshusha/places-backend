const router = require('express').Router();
const { post, login } = require('../controllers/users');
const authorization = require('../middleware/authorization');
const users = require('./users');
const cards = require('./cards');
const NotFoundErr = require('../middleware/errors/not-found-err');
const { posts, sign } = require('../middleware/validate/users');


router.get('/crash-test', () => {
    setTimeout(() => {
        throw new Error('Сервер сейчас упадёт!');
    }, 0);
});

router.post('/signin', sign, login);
router.post('/signup', posts, post);

router.use(authorization);

router.use('/users', users);
router.use('/cards', cards);
router.all('*', () => {
    throw new NotFoundErr('Not found!');
});

module.exports = router;

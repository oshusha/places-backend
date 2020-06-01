// eslint-disable-next-line import/no-extraneous-dependencies
const Card = require('../models/card');
const NotFoundErr = require('../middleware/errors/not-found-err');
const ForbiddenErr = require('../middleware/errors/forbidden-err');
const BadRequestErr = require('../middleware/errors/bad-request-err');
const InternalServerErr = require('../middleware/errors/internal-server-err');

module.exports.get = async (req, res, next) => {
    try {
        const cards = await Card.find().populate('owner');
        res.json({ data: cards });
    } catch (err) {
        next(new InternalServerErr(err.message));
    }
};

module.exports.post = async (req, res, next) => {
    const card = new Card({
        name: req.body.name,
        link: req.body.link,
        owner: req.user._id,
        likes: [],
    });

    try {
        const newCard = await card.save();
        res.status(201).json({ data: newCard });
    } catch (err) {
        next(new BadRequestErr('Cant create the card'));
    }
};

module.exports.delete = async (req, res, next) => {
    try {
        if (res.card.owner.toString() === req.user._id) {
            await res.card.delete();
            res.json({ message: 'Successfully deleted' });
        } else {
            next(new ForbiddenErr('Permission denied'));
        }
    } catch (err) {
        next(new NotFoundErr('Invalid card id'));
    }
};

module.exports.like = async (req, res, next) => {
    const userId = req.user._id;
    try {
        await res.card.likes.addToSet(userId);
        const updatedCard = await res.card.save();
        res.json({ data: updatedCard });
    } catch (err) {
        next(new NotFoundErr('Invalid card id'));
    }
};

module.exports.unlike = async (req, res, next) => {
    const userId = req.user._id;
    try {
        await res.card.likes.pull(userId);
        const updatedCard = await res.card.save();
        res.json({ data: updatedCard });
        // eslint-disable-next-line node/no-unsupported-features/es-syntax
    } catch (err) {
        next(new NotFoundErr('Invalid card id'));
    }
};

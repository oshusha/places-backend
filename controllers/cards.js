// eslint-disable-next-line import/no-extraneous-dependencies
const Card = require('../models/card');

module.exports.get = async (req, res) => {
    try {
        const cards = await Card.find().populate('owner');
        res.json({ data: cards });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports.post = async (req, res) => {
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
        res.status(400).json({ message: err.message });
    }
};

module.exports.delete = async (req, res) => {
    try {
        if (res.card.owner.toString() === req.user._id) {
            await res.card.delete();
            res.json({ message: 'Successfully deleted' });
        } else {
            res.status(403).json({ message: 'Permission denied!' });
        }
    } catch (err) {
        res.status(404).json({ message: 'Invalid card id' });
    }
};

module.exports.like = async (req, res) => {
    const userId = req.user._id;
    try {
        await res.card.likes.addToSet(userId);
        const updatedCard = await res.card.save();
        res.json({ data: updatedCard });
    } catch (err) {
        res.status(404).json({ message: 'Invalid card id' });
    }
};

module.exports.unlike = async (req, res) => {
    const userId = req.user._id;
    try {
        await res.card.likes.pull(userId);
        const updatedCard = await res.card.save();
        res.json({ data: updatedCard });
        // eslint-disable-next-line node/no-unsupported-features/es-syntax
    } catch (err) {
        res.status(404).json({ message: 'Invalid card id' });
    }
};

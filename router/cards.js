// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');

const router = express.Router();
const cards = require('../controllers/cards');

const { getCard } = require('../middleware/cards');
const { get, post } = require('../middleware/validate/cards');

// Get all cards
router.get('/', cards.get);
// Get one card
router.get('/:id', get, getCard, (req, res) => {
    if (res.card) {
        res.json(res.card);
    }
});

// Create card
router.post('/', post, cards.post);
// Delete one card

router.delete('/:id', get, getCard, cards.delete);

// Like Card

router.put('/:id/likes', get, getCard, cards.like);

// Unlike Card

router.delete('/:id/likes', get, getCard, cards.unlike);


module.exports = router;

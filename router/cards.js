// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');

const router = express.Router();
const cards = require("../controllers/cards");

const { getCard } = require("../middleware/cards");

// Get all cards
router.get("/", cards.get);
// Get one card
router.get("/:id", getCard , (req, res) => {
  res.json(res.card);
});

// Create card
router.post("/", cards.post);
// Delete one card

router.delete("/:id", getCard, cards.delete);
// Like Card

router.patch("/:id/likes", getCard, cards.like);

// Unlike Card

router.delete("/:id/likes", getCard, cards.unlike);


module.exports = router;

const objectId = require("mongodb").ObjectID;
const Card = require("../models/card");

async function getCard(req, res, next) {
  if (objectId.isValid(req.params.id)) {
    const card = await Card.findById(req.params.id);
    try {
      if (card == null) {
        await res.status(404).json({ message: "Not Found" });
      }
    } catch (err) {
      await res.status(500).json({ message: err.message });
    }

    res.card = card;
  } else {
    res.status(404).json({ message: "Invalid card id" });
  }
  next();
}
module.exports = { getCard };

const objectId = require('mongodb').ObjectID;
const Card = require('../models/card');

async function getCard(req, res, next) {
  if (objectId.isValid(req.params.id)) {
    const card = await Card.findById(req.params.id);
    res.card = card;
  }
  next();
}
module.exports = { getCard };



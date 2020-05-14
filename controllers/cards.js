// eslint-disable-next-line import/no-extraneous-dependencies
const Card = require("../models/card");

module.exports.get = async (req, res) => {
  try {
    const cards = await Card.find().populate("owner");
    res.json({data: cards});
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

module.exports.post = async (req, res) => {
  const {body, user} = req;
  const {name, link} = body;
  const card = new Card({
    name: name,
    link: link,
    owner: user._id,
    likes: []
  });

  try {
    const newCard = await card.save();
    res.status(201).json({data: newCard});
  } catch (err) {
    res.status(400).json({message: err.message});
  }
};

module.exports.delete = async (req, res) => {
  try {
    await res.card.delete();
    res.json({message: "Successfully deleted"});
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

module.exports.like = async (req, res) => {
  const userId = req.user._id;
  await res.card.likes.addToSet(userId);
  try {
    const updatedCard = await res.card.save();
    res.json({data: updatedCard});
  } catch (err) {
    res.status(400).json({message: err.message});
  }
};

module.exports.unlike = async (req, res) => {
  const userId = req.user._id;
  await res.card.likes.pull(userId);
  try {
    const updatedCard = await res.card.save();
    res.json({data: updatedCard});
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
  } catch (err) {
    res.status(400).json({message: err.message});
  }
};

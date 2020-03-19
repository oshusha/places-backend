const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  },
  link: {
    type: String,
    validate: {
      validator(link) {
        return /^https?:\/\/\S+(?:\.[a-zA-Z]{2,})\/\S+(?:jpg|jpeg|png)$/.test(link);
      }
    },
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, default: [] }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('card', cardSchema);

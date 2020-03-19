const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  },
  avatar: {
    type: String,
    validate: {
      validator(link) {
        return /^https?:\/\/\S+(?:\.[a-zA-Z]{2,8})\/\S+(?:jpg|jpeg|png)$/.test(link);
      }
    },
    required: true
  }
});

module.exports = mongoose.model("user", userSchema);

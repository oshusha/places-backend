const express = require('express');

const router = express.Router();

const users = require("../controllers/users");
const { getUser } = require("../middleware/users")

// Get All Users
router.get("/", users.get);

// Get one card
router.get("/:id", getUser , (req, res) => {
  res.json(res.user);
});

// Create user
router.post("/", users.post);

// Update info
router.patch("/:id", getUser, users.update);

// Update avatar
router.patch("/:id/avatar", getUser, users.update);

module.exports = router;

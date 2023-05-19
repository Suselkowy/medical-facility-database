const express = require("express");
const router = express.Router();
const User = require("../models/user");

const userController = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", userController.registerUser);

router.post("/login", userController.loginUser);
router.post("/me", protect, userController.getMe);

module.exports = router;

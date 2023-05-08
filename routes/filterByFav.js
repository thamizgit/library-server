const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');

router.get("/:username", userController.getFav);

module.exports = router;
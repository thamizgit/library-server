const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

router.put("/", userController.removeFav);

module.exports = router;
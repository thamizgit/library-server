const express = require('express');

const router = express.Router();
const userController = require('../controllers/registerController');

router.post("/", userController.createUser);

module.exports = router;
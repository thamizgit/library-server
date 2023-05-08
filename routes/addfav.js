const express = require("express");
const router = express.Router();

const userController = require('../controllers/userController');

router.put("/", userController.addFav);

module.exports = router;
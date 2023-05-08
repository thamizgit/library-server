const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get("/:username", userController.getRecents)
    .put("/", userController.addRecents);

module.exports = router;
const express = require('express');
const router = express.Router();
const shipsController = require('../controllers/ship.controller');

router.get('/', shipsController.getAllShips);
router.post('/', shipsController.createShip);

module.exports = router;

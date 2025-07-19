const express = require('express');
const router = express.Router();
const shipsController = require('../controllers/ship.controller');

router.get('/', shipsController.getAllShips);
router.get('/:id', shipsController.getShipById);
router.post('/', shipsController.createShip);
router.put('/:id', shipsController.updateShip);
router.delete('/:id', shipsController.deleteShip);

module.exports = router;

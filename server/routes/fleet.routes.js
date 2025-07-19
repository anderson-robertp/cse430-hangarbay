const express = require('express');
const router = express.Router();
const fleetsController = require('../controllers/fleet.controller');

router.get('/', fleetsController.getAllFleets);
router.post('/', fleetsController.createFleet);
router.put('/:id', fleetsController.updateFleet);
router.delete('/:id', fleetsController.deleteFleet);

module.exports = router;

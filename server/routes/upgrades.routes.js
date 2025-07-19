const express = require('express');
const router = express.Router();
const upgradesController = require('../controllers/upgrades.controller');

// Get all upgrades
router.get('/', upgradesController.getAllUpgrades);
// Get upgrade by ID
router.get('/:id', upgradesController.getUpgradeById);
// Create a new upgrade
router.post('/', upgradesController.createUpgrade);
// Update an upgrade
router.put('/:id', upgradesController.updateUpgrade);
// Delete an upgrade
router.delete('/:id', upgradesController.deleteUpgrade);

module.exports = router;
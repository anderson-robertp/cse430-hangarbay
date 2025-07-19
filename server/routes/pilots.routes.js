const express = require('express');
const router = express.Router();
const pilotsController = require('../controllers/pilots.controller');

// Get all pilots
router.get('/', pilotsController.getAllPilots);
// Get pilot by ID
router.get('/:id', pilotsController.getPilotById);
// Create a new pilot
router.post('/', pilotsController.createPilot);
// Update a pilot
router.put('/:id', pilotsController.updatePilot);
// Delete a pilot
router.delete('/:id', pilotsController.deletePilot);

module.exports = router;
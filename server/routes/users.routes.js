const express = require('express');
const router = express.Router();
const usersController = require('../controllers/user.controller');

// Get all users
router.get('/', usersController.getAllUsers);
// Get user by ID
router.get('/:id', usersController.getUserById);
// Create a new user
router.post('/', usersController.createUser);
// Update a user
router.put('/:id', usersController.updateUser);
// Delete a user
router.delete('/:id', usersController.deleteUser);

module.exports = router;
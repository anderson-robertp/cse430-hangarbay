const express = require('express');
const router = express.Router();
const chatsController = require('../controllers/chats.controller');

// Get all chats
router.get('/', chatsController.getAllChats);
// Get chat by ID
router.get('/:id', chatsController.getChatById);
// Create a new chat
router.post('/', chatsController.createChat);
// Update a chat
router.put('/:id', chatsController.updateChat);
// Delete a chat
router.delete('/:id', chatsController.deleteChat);

module.exports = router;
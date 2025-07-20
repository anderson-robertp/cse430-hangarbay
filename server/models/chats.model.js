const mongoose = require('mongoose');

const chatsSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  sender: { type: String, required: true },
  timestamp: { type: Date, required: true },
  message: { type: String, required: true }
});

module.exports = mongoose.model('Chats', chatsSchema);

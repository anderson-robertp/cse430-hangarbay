const Chats = require('../models/chats.model');

// GET all chats
exports.getAllChats = async (req, res) => {
  try {
    const chats = await Chats.find();
    res.json(chats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// GET chat by ID
exports.getChatById = async (req, res) => {
  try {
    const chat = await Chats.findOne({id: req.params.id});
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    res.json(chat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// POST a new chat
exports.createChat = async (req, res) => {
  try {
    const newChat = new Chats(req.body);
    await newChat.save();
    res.status(201).json(newChat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// PUT update chat
exports.updateChat = async (req, res) => {
  try {
    const updatedChat = await Chats.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedChat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    res.json(updatedChat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// DELETE chat
exports.deleteChat = async (req, res) => {
  try {
    const deletedChat = await Chats.findByIdAndDelete(req.params.id);
    if (!deletedChat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    res.json({ message: 'Chat deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
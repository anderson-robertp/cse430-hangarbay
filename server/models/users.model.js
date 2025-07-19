const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  inventory: [{ type: Number }],  // Array of IDs referencing ships or items
  fleets: [{ type: Number}],  // Array of fleet IDs
});

module.exports = mongoose.model('User', userSchema);

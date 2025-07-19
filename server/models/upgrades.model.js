const mongoose = require('mongoose');

const upgradeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  id: { type: Number, required: true },
  slot: { type: String, required: true },
  points: { type: Number, required: true },
  attack: { type: Number },
  range: { type: String },
  text: { type: String },
  image: { type: String },
  xws: { type: String, required: true }
});

module.exports = mongoose.model('Upgrade', upgradeSchema);

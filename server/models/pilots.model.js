const mongoose = require('mongoose');

const pilotSchema = new mongoose.Schema({
  name: { type: String, required: true },
  id: { type: Number, required: true },
  unique: { type: Boolean, default: false },
  ship: { type: String, required: true },
  skill: { type: Number, required: true },
  points: { type: Number, required: true },
  slots: [{ type: String }],
  text: { type: String },
  image: { type: String },
  faction: { type: String, required: true },
  xws: { type: String, required: true }
});

module.exports = mongoose.model('Pilot', pilotSchema);

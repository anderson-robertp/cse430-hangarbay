// server/models/ship.model.js
const mongoose = require('mongoose');

const shipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  faction: [String],
  attack: Number,
  agility: Number,
  hull: Number,
  shields: Number,
  actions: [String],
  maneuvers: [[Number]],
  size: { type: String, enum: ['small', 'medium', 'large'] },
  xws: String,
  id: Number,
  firing_arcs: [String],
  dial: [String]
});

module.exports = mongoose.model('Ship', shipSchema);

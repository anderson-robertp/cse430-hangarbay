// server/models/fleet.model.js
const mongoose = require('mongoose');

const fleetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ships: [
    {
      shipId: { type: String, ref: 'Ship' },
      quantity: { type: Number, default: 1 }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Fleet', fleetSchema);


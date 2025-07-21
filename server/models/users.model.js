const mongoose = require('mongoose');

const inventoryEntrySchema = new mongoose.Schema({
  shipId: { type: Number, required: true },  // ID from your Ship catalog
  selectedPilotId: { type: Number, required: true },  // ID from your Pilot list
  selectedUpgradeIds: [{ type: Number }],  // IDs from Upgrade list
  quantity: { type: Number, required: true },
  totalPoints: { type: Number, required: true }
}, { _id: false });

const userSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  inventory: [inventoryEntrySchema],  // Embedded inventory schema
  fleets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Fleet' }]
});

module.exports = mongoose.model('User', userSchema);

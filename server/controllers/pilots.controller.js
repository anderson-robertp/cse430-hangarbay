const Pilot = require('../models/pilots.model');

// Get all pilots
exports.getAllPilots = async (req, res) => {
  try {
    const pilots = await Pilot.find();
    res.json(pilots);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Get pilot by ID
exports.getPilotById = async (req, res) => {
    try {
    const pilot = await Pilot.findById(req.params.id);
    if (!pilot) {
        return res.status(404).json({ message: 'Pilot not found' });
        }
    res.json(pilot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Create a new pilot
exports.createPilot = async (req, res) => {
  try {
    const newPilot = new Pilot(req.body);
    await newPilot.save();
    res.status(201).json(newPilot);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Update a pilot
exports.updatePilot = async (req, res) => {
  try {
    const updatedPilot = await Pilot.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPilot) {
      return res.status(404).json({ message: 'Pilot not found' });
    }
    res.json(updatedPilot);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Delete a pilot
exports.deletePilot = async (req, res) => {
  try {
    const deletedPilot = await Pilot.findByIdAndDelete(req.params.id);
    if (!deletedPilot) {
      return res.status(404).json({ message: 'Pilot not found' });
    }
    res.json({ message: 'Pilot deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
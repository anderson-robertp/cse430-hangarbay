const Fleet = require('../models/fleet.model');

// GET all fleets
exports.getAllFleets = async (req, res) => {
  try {
    const fleets = await Fleet.find();
    //console.log(fleets);
    res.json(fleets);
  } catch (err) {
    console.error('Error fetching fleets:', err);
    res.status(500).json({ message: err.message });
  }
};

// GET fleet by ID
exports.getFleetById = async (req, res) => {
    try {
        const fleet = await Fleet.findOne({id: req.params.id});
        if (!fleet) {
        return res.status(404).json({ message: 'Fleet not found' });
        }
        res.json(fleet);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// POST new fleet
exports.createFleet = async (req, res) => {
  try {
    const newFleet = new Fleet(req.body);
    await newFleet.save();
    res.status(201).json(newFleet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT update fleet
exports.updateFleet = async (req, res) => {
  try {
    const updatedFleet = await Fleet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedFleet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE fleet
exports.deleteFleet = async (req, res) => {
  try {
    await Fleet.findByIdAndDelete(req.params.id);
    res.json({ message: 'Fleet deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

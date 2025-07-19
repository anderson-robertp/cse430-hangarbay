const Upgrades = require('../models/upgrades.model');

// GET all upgrades
exports.getAllUpgrades = async (req, res) => {
  try {
    const upgrades = await Upgrades.find();
    res.json(upgrades);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// GET upgrade by ID
exports.getUpgradeById = async (req, res) => {
    try {
        const upgrade = await Upgrades.findById(req.params.id);
        if (!upgrade) {
        return res.status(404).json({ message: 'Upgrade not found' });
        }
        res.json(upgrade);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// POST a new upgrade
exports.createUpgrade = async (req, res) => {
  try {
    const newUpgrade = new Upgrades(req.body);
    await newUpgrade.save();
    res.status(201).json(newUpgrade);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// PUT update upgrade
exports.updateUpgrade = async (req, res) => {
  try {
    const updatedUpgrade = await Upgrades.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUpgrade) {
        return res.status(404).json({ message: 'Upgrade not found' });
        }
    res.json(updatedUpgrade);
  } catch (err) {
    res.status(400).json({ message: err.message });
  } 
}

// DELETE upgrade
exports.deleteUpgrade = async (req, res) => {
  try {
    const deletedUpgrade = await Upgrades.findByIdAndDelete(req.params.id);
    if (!deletedUpgrade) {
      return res.status(404).json({ message: 'Upgrade not found' });
    }
    res.json({ message: 'Upgrade deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
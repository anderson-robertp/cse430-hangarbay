const Ship = require('../models/ship.model');

// GET all ships
exports.getAllShips = async (req, res) => {
  try {
    const ships = await Ship.find();
    res.json(ships);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ship by ID
exports.getShipById = async (req, res) => {
    try {
        const ship = await Ship.findOne({id: req.params.id});
        if (!ship) {
        return res.status(404).json({ message: 'Ship not found' });
        }
        res.json(ship);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// POST a new ship
exports.createShip = async (req, res) => {
  try {
    const newShip = new Ship(req.body);
    await newShip.save();
    res.status(201).json(newShip);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT update ship
exports.updateShip = async (req, res) => {
  try {
    const updatedShip = await Ship.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedShip);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE ship
exports.deleteShip = async (req, res) => {
  try {
    await Ship.findByIdAndDelete(req.params.id);
    res.json({ message: 'Ship deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
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

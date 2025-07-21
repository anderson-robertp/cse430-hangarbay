const User = require('../models/users.model');

// get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findOne({id: req.params.id});
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// create a new user
exports.createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// update user
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// delete user
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

  // get user inventory
exports.getUserInventory = async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.inventory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

  // add ship to user inventory
exports.addShipToInventory = async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
      
    const inventoryEntry = req.body;
    user.inventory.push(inventoryEntry);
    await user.save();
      
    res.status(201).json(inventoryEntry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// update ship in user inventory
exports.updateShipInInventory = async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const shipId = parseInt(req.params.shipId, 10);
    const inventoryEntry = user.inventory.find(entry => entry.shipId === shipId);
    if (!inventoryEntry) {
      return res.status(404).json({ message: 'Ship not found in inventory' });
    }

    Object.assign(inventoryEntry, req.body);
    await user.save();

    res.json(inventoryEntry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require('path');
const http = require('http');

var index = require('../server/routes/app');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const fleetRoutes = require('./routes/fleet.routes');
const shipRoutes = require('./routes/ships.routes');
const pilotRoutes = require('./routes/pilots.routes');
const usersRoutes = require('./routes/users.routes');
const upgradesRoutes = require('./routes/upgrades.routes');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/hangarbay', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Tell express to use the following parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(logger('dev')); // Tell express to use the Morgan logger

// Add support for CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

// Routes
app.get('/', (req, res) => {
  res.send('X-Wing Inventory API Running');
});
app.use('/api/fleet', fleetRoutes);
app.use('/api/ships', shipRoutes);
//app.use('/api', index);
app.use('/api/pilots', pilotRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/upgrades', upgradesRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});
// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1); // Exit the process with failure
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

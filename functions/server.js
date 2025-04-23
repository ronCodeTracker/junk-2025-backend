

require('dotenv').config();
const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the CORS middleware
const itemRoutes = require('./routes/itemRoutes');

const app = express();

// Middleware
//app.use(cors()); // Enable CORS for all routes
//app.use(express.json()); // Parse JSON request bodies

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/api/items', itemRoutes);

// Export the app as a serverless function
module.exports.handler = serverless(app);



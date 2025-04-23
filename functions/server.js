

require('dotenv').config();
const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const itemRoutes = require('./routes/itemRoutes');

const app = express();

// Middleware

//app.use((req, res, next) => {
//  let rawData = '';
//  req.on('data', (chunk) => {
//    rawData += chunk;
//  });
//  req.on('end', () => {
//    try {
//      req.body = JSON.parse(rawData); // Manually parse JSON
//      console.log('Parsed JSON body:', req.body); // Debug log
//    } catch (err) {
//      console.error('Error parsing JSON:', err.message);
//      req.body = {}; // Set to an empty object if parsing fails
//    }
//    next();
//  });
//});

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



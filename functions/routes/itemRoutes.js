

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const router = express.Router();


router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
    extended: true
}))


// Define the Mongoose schema and model
const itemSchema = new mongoose.Schema({
    location: { type: String, required: true },
    item: { type: String, required: true },
  });

const Item = mongoose.model('Item', itemSchema);

// POST: Add a new item
router.post('/', async (req, res) => {
     
    console.log("started post route");
    console.log("Parsed request body:", JSON.parse(req.body)); // Debug log
    console.log("Parsed request body location:", req.body.location);
    const reqBody = JSON.parse(req.body); 
  try {
    const { location, item } = reqBody;

    if (!location || !item) {
      return res.status(400).json({ error: 'Both location and item are required' });
    }

    const newItem = new Item({ location, item });
    await newItem.save();
    res.status(201).json({ message: 'Item saved successfully', item: newItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: Retrieve all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;




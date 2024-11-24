const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Shipment = require('../models/Shipment');

router.post('/', auth, async (req, res) => {
  try {
    const shipment = new Shipment({
      ...req.body,
      customer: req.user._id
    });
    await shipment.save();
    res.status(201).json(shipment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const shipments = await Shipment.find({
      customer: req.user._id
    }).populate('documents');
    res.json(shipments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
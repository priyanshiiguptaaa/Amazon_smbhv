const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  trackingNumber: {
    type: String,
    required: true,
    unique: true
  },
  carrier: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'in_transit', 'delivered', 'cancelled'],
    default: 'pending'
  },
  origin: {
    address: String,
    city: String,
    state: String,
    country: String,
    zipCode: String
  },
  destination: {
    address: String,
    city: String,
    state: String,
    country: String,
    zipCode: String
  },
  items: [{
    name: String,
    quantity: Number,
    weight: Number,
    unit: String
  }],
  documents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document'
  }],
  estimatedDelivery: Date,
  actualDelivery: Date,
  cost: {
    amount: Number,
    currency: String
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Shipment', shipmentSchema);

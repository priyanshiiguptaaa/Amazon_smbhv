const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  shipment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shipment'
  },
  type: {
    type: String,
    enum: ['invoice', 'packing_list', 'bill_of_lading', 'customs_declaration', 'certificate_of_origin', 'other'],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  mimeType: String,
  size: Number,
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  metadata: {
    documentNumber: String,
    issueDate: Date,
    expiryDate: Date,
    issuingAuthority: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

documentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Document', documentSchema);

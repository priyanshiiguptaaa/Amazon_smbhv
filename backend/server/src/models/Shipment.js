const shipmentSchema = new mongoose.Schema({
    trackingNumber: {
      type: String,
      required: true,
      unique: true
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    destination: {
      address: String,
      city: String,
      state: String,
      country: String,
      zipCode: String
    },
    origin: {
      address: String,
      city: String,
      state: String,
      country: String,
      zipCode: String
    },
    status: {
      type: String,
      enum: ['pending', 'in-transit', 'delivered', 'delayed'],
      default: 'pending'
    },
    carrier: {
      type: String,
      required: true
    },
    weight: Number,
    dimensions: {
      length: Number,
      width: Number,
      height: Number
    },
    cost: {
      amount: Number,
      currency: { type: String, default: 'USD' }
    },
    documents: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Document'
    }],
    timeline: [{
      status: String,
      location: String,
      timestamp: Date,
      description: String
    }],
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
  const Shipment = mongoose.model('Shipment', shipmentSchema);
  
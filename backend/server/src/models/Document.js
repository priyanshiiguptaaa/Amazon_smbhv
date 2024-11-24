const documentSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['bill-of-lading', 'shipping-bill', 'certificate', 'invoice', 'packing'],
      required: true
    },
    shipment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shipment'
    },
    url: {
      type: String,
      required: true
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
  const Document = mongoose.model('Document', documentSchema);
  
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');
const Document = require('../models/Document');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

// Get all documents for a user
router.get('/', auth, async (req, res) => {
  try {
    const documents = await Document.find({ user: req.user._id })
      .populate('shipment')
      .sort({ createdAt: -1 });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching documents', error: error.message });
  }
});

// Get a single document
router.get('/:id', auth, async (req, res) => {
  try {
    const document = await Document.findOne({
      _id: req.params.id,
      user: req.user._id
    }).populate('shipment');

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    res.json(document);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching document', error: error.message });
  }
});

// Upload a new document
router.post('/', auth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const document = new Document({
      ...req.body,
      user: req.user._id,
      fileUrl: `/uploads/${req.file.filename}`,
      mimeType: req.file.mimetype,
      size: req.file.size
    });

    await document.save();
    res.status(201).json(document);
  } catch (error) {
    res.status(500).json({ message: 'Error uploading document', error: error.message });
  }
});

// Update document metadata
router.put('/:id', auth, async (req, res) => {
  try {
    const document = await Document.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    res.json(document);
  } catch (error) {
    res.status(500).json({ message: 'Error updating document', error: error.message });
  }
});

// Delete a document
router.delete('/:id', auth, async (req, res) => {
  try {
    const document = await Document.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    // TODO: Delete the actual file from storage

    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting document', error: error.message });
  }
});

// Update document status
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const document = await Document.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { status, updatedAt: Date.now() },
      { new: true }
    );

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    res.json(document);
  } catch (error) {
    res.status(500).json({ message: 'Error updating document status', error: error.message });
  }
});

module.exports = router;

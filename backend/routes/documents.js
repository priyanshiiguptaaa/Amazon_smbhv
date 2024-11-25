const express = require('express');
const router = express.Router();
const Document = require('../models/Document');

// Get all documents
router.get('/', async (req, res) => {
    try {
        const documents = await Document.find(req.query);
        res.json(documents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single document
router.get('/:id', async (req, res) => {
    try {
        const document = await Document.findById(req.params.id);
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.json(document);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a document
router.post('/', async (req, res) => {
    try {
        const document = await Document.create(req.body);
        res.status(201).json(document);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a document
router.put('/:id', async (req, res) => {
    try {
        const document = await Document.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.json(document);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a document
router.delete('/:id', async (req, res) => {
    try {
        const document = await Document.findByIdAndDelete(req.params.id);
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.json({ message: 'Document deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

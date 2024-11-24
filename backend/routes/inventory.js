const express = require('express');
const router = express.Router();
const mockInventory = require('../data/mockInventory');

let inventory = [...mockInventory];

// Get all inventory items
router.get('/', (req, res) => {
    res.json({ inventory });
});

// Add a new product
router.post('/', (req, res) => {
    const newProduct = {
        ...req.body,
        sku: `FF-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
    };
    inventory.push(newProduct);
    res.status(201).json({ product: newProduct });
});

// Delete a product
router.delete('/:sku', (req, res) => {
    const { sku } = req.params;
    inventory = inventory.filter(item => item.sku !== sku);
    res.status(200).json({ message: 'Product deleted successfully' });
});

// Update a product
router.put('/:sku', (req, res) => {
    const { sku } = req.params;
    const updatedProduct = req.body;
    
    inventory = inventory.map(item => 
        item.sku === sku ? { ...item, ...updatedProduct } : item
    );
    
    res.json({ product: inventory.find(item => item.sku === sku) });
});

module.exports = router;

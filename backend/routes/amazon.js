const express = require('express');
const router = express.Router();
const amazonApi = require('../utils/amazonApi');
const auth = require('../middleware/auth');

// Get all orders
router.get('/orders', auth, async (req, res) => {
    try {
        const { createdAfter, orderStatuses } = req.query;
        const params = {};
        
        if (createdAfter) {
            params.CreatedAfter = createdAfter;
        }
        if (orderStatuses) {
            params.OrderStatuses = orderStatuses.split(',');
        }

        const orders = await amazonApi.getOrders(params);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
});

// Get order items
router.get('/orders/:orderId/items', auth, async (req, res) => {
    try {
        const { orderId } = req.params;
        const items = await amazonApi.getOrderItems(orderId);
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order items', error: error.message });
    }
});

// Get shipment details
router.get('/shipments/:shipmentId', auth, async (req, res) => {
    try {
        const { shipmentId } = req.params;
        const shipment = await amazonApi.getShipmentDetails(shipmentId);
        res.json(shipment);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching shipment details', error: error.message });
    }
});

// Get inventory summary
router.get('/inventory', auth, async (req, res) => {
    try {
        const inventory = await amazonApi.getInventorySummaries();
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching inventory', error: error.message });
    }
});

// Create shipment
router.post('/shipments', auth, async (req, res) => {
    try {
        const shipment = await amazonApi.createShipment(req.body);
        res.json(shipment);
    } catch (error) {
        res.status(500).json({ message: 'Error creating shipment', error: error.message });
    }
});

module.exports = router;

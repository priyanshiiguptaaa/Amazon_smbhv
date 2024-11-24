const express = require('express');
const router = express.Router();
const mockOrders = require('../data/mockOrders');
const auth = require('../middleware/auth');

let orders = [...mockOrders];

// Get all orders - protected route
router.get('/', auth, (req, res) => {
    res.json({ orders });
});

// Get order by ID - protected route
router.get('/:orderId', auth, (req, res) => {
    const { orderId } = req.params;
    const order = orders.find(o => o.orderId === orderId);
    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ order });
});

// Create new order - protected route
router.post('/', auth, (req, res) => {
    const newOrder = {
        ...req.body,
        orderId: `ORD-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 3).toUpperCase()}`,
        orderDate: new Date().toISOString().split('T')[0]
    };
    orders.push(newOrder);
    res.status(201).json({ order: newOrder });
});

// Update order status - protected route
router.patch('/:orderId/status', auth, (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;
    
    const order = orders.find(o => o.orderId === orderId);
    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }
    
    order.status = status;
    res.json({ order });
});

module.exports = router;

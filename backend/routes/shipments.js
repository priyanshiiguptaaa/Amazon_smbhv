const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const mockShipments = require('../data/mockShipments');

let shipments = [...mockShipments];

// Get all shipments
router.get('/', auth, (req, res) => {
    res.json({ shipments });
});

// Get shipment by ID
router.get('/:shipmentId', auth, (req, res) => {
    const { shipmentId } = req.params;
    const shipment = shipments.find(s => s.shipmentId === shipmentId);
    if (!shipment) {
        return res.status(404).json({ message: 'Shipment not found' });
    }
    res.json({ shipment });
});

// Update shipment status
router.patch('/:shipmentId/status', auth, (req, res) => {
    const { shipmentId } = req.params;
    const { status } = req.body;
    
    const shipment = shipments.find(s => s.shipmentId === shipmentId);
    if (!shipment) {
        return res.status(404).json({ message: 'Shipment not found' });
    }
    
    shipment.status = status;
    res.json({ shipment });
});

// Update customs clearance status
router.patch('/:shipmentId/customs', auth, (req, res) => {
    const { shipmentId } = req.params;
    const { status } = req.body;
    
    const shipment = shipments.find(s => s.shipmentId === shipmentId);
    if (!shipment) {
        return res.status(404).json({ message: 'Shipment not found' });
    }
    
    shipment.customsClearance = status;
    res.json({ shipment });
});

module.exports = router;

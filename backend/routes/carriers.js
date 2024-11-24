const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Mock carrier data (replace with actual carrier API integration)
const carriers = [
  {
    id: 'maersk',
    name: 'Maersk',
    services: ['ocean_freight', 'inland_transport'],
    routes: ['India-USA', 'India-Europe']
  },
  {
    id: 'msc',
    name: 'Mediterranean Shipping Company',
    services: ['ocean_freight', 'inland_transport'],
    routes: ['India-USA', 'India-Europe', 'India-Asia']
  },
  {
    id: 'cma_cgm',
    name: 'CMA CGM',
    services: ['ocean_freight', 'inland_transport'],
    routes: ['India-USA', 'India-Europe', 'India-Asia']
  }
];

// Get all available carriers
router.get('/', auth, async (req, res) => {
  try {
    // In a real implementation, this would fetch from carrier APIs
    res.json(carriers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching carriers', error: error.message });
  }
});

// Get carrier rates
router.post('/rates', auth, async (req, res) => {
  try {
    const { origin, destination, weight, dimensions } = req.body;

    // Mock rate calculation (replace with actual carrier API integration)
    const rates = carriers.map(carrier => ({
      carrierId: carrier.id,
      carrierName: carrier.name,
      rate: {
        amount: Math.floor(Math.random() * 5000) + 1000, // Random rate between 1000-6000
        currency: 'USD'
      },
      transitTime: Math.floor(Math.random() * 20) + 10, // Random transit time between 10-30 days
      services: carrier.services
    }));

    res.json(rates);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching rates', error: error.message });
  }
});

// Get carrier schedules
router.post('/schedules', auth, async (req, res) => {
  try {
    const { origin, destination, date } = req.body;

    // Mock schedule data (replace with actual carrier API integration)
    const schedules = carriers.map(carrier => ({
      carrierId: carrier.id,
      carrierName: carrier.name,
      departures: [
        {
          vessel: `${carrier.name} Vessel 1`,
          departure: new Date(date).toISOString(),
          arrival: new Date(new Date(date).setDate(new Date(date).getDate() + 15)).toISOString(),
          available_space: Math.random() > 0.5
        },
        {
          vessel: `${carrier.name} Vessel 2`,
          departure: new Date(new Date(date).setDate(new Date(date).getDate() + 7)).toISOString(),
          arrival: new Date(new Date(date).setDate(new Date(date).getDate() + 22)).toISOString(),
          available_space: Math.random() > 0.5
        }
      ]
    }));

    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching schedules', error: error.message });
  }
});

// Book shipment with carrier
router.post('/book', auth, async (req, res) => {
  try {
    const { carrierId, scheduleId, shipmentDetails } = req.body;

    // Mock booking confirmation (replace with actual carrier API integration)
    const booking = {
      bookingId: `BK${Date.now()}`,
      carrierId,
      status: 'confirmed',
      details: {
        ...shipmentDetails,
        bookingDate: new Date().toISOString(),
        confirmationNumber: `CN${Math.floor(Math.random() * 1000000)}`
      }
    };

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error booking shipment', error: error.message });
  }
});

module.exports = router;

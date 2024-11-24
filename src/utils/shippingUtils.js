// Mock carrier rate APIs
const carriers = {
  DHL: { baseRate: 10, kgRate: 5 },
  FedEx: { baseRate: 12, kgRate: 4.5 },
  UPS: { baseRate: 11, kgRate: 4.8 },
  BlueDart: { baseRate: 9, kgRate: 4.2 }
};

export const getCarrierRates = (weight, destination) => {
  const rates = Object.entries(carriers).map(([carrier, rates]) => ({
    carrier,
    rate: rates.baseRate + (weight * rates.kgRate),
    estimatedDays: Math.floor(Math.random() * 5) + 3,
    services: ['Express', 'Standard', 'Economy']
  }));
  
  return rates.sort((a, b) => a.rate - b.rate);
};

export const generateShippingLabel = async (orderDetails) => {
  // Simulate API call to carrier's label generation service
  return {
    labelUrl: `https://api.mockcarrier.com/labels/${orderDetails.orderId}`,
    trackingNumber: Math.random().toString(36).substring(7).toUpperCase(),
    carrier: orderDetails.carrier
  };
};

export const bookCarrier = async (orderDetails, carrier) => {
  // Simulate carrier booking
  return {
    bookingId: Math.random().toString(36).substring(7).toUpperCase(),
    status: 'confirmed',
    pickupDate: new Date(Date.now() + 86400000).toISOString(),
    carrier
  };
};

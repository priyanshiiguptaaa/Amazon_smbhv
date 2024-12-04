// Mock data for development
const mockShipments = [
  {
    id: 'SHP001',
    shipmentId: 'SHP001',
    trackingNumber: 'TRK123456789',
    status: 'In Transit',
    customerName: 'Raj Kumar',
    origin: 'Mumbai, India',
    destination: 'Delhi, India',
    customsStatus: 'Cleared',
    estimatedDelivery: '2024-02-15',
    customsValue: 25000,
    timeline: [
      { date: '2024-02-10', status: 'Order Placed', location: 'Mumbai' },
      { date: '2024-02-11', status: 'Picked Up', location: 'Mumbai Hub' },
      { date: '2024-02-12', status: 'In Transit', location: 'Maharashtra' }
    ]
  },
  {
    id: 'SHP002',
    shipmentId: 'SHP002',
    trackingNumber: 'TRK987654321',
    status: 'Delivered',
    customerName: 'Priya Singh',
    origin: 'Bangalore, India',
    destination: 'Chennai, India',
    customsStatus: 'N/A',
    estimatedDelivery: '2024-02-10',
    customsValue: 15000,
    timeline: [
      { date: '2024-02-08', status: 'Order Placed', location: 'Bangalore' },
      { date: '2024-02-09', status: 'Picked Up', location: 'Bangalore Hub' },
      { date: '2024-02-10', status: 'Delivered', location: 'Chennai' }
    ]
  }
];

const mockStats = {
  total: 2,
  inTransit: 1,
  delivered: 1,
  pending: 0,
  delayed: 0,
  customsClearance: 0
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Get all shipments
export const getAllShipments = async () => {
  await delay(500); // Simulate network delay
  return mockShipments;
};

// Get single shipment by ID
export const getShipmentById = async (shipmentId) => {
  await delay(300);
  const shipment = mockShipments.find(s => s.id === shipmentId);
  if (!shipment) {
    throw new Error('Shipment not found');
  }
  return shipment;
};

// Create new shipment
export const createShipment = async (shipmentData) => {
  await delay(500);
  const newShipment = {
    id: `SHP${String(mockShipments.length + 1).padStart(3, '0')}`,
    shipmentId: `SHP${String(mockShipments.length + 1).padStart(3, '0')}`,
    trackingNumber: `TRK${Date.now()}`,
    status: 'Pending',
    customsStatus: 'Pending',
    customerName: shipmentData.customerName || 'Unknown Customer',
    customsValue: shipmentData.customsValue || 0,
    timeline: [
      {
        date: new Date().toISOString().split('T')[0],
        status: 'Order Placed',
        location: shipmentData.origin
      }
    ],
    ...shipmentData
  };
  mockShipments.push(newShipment);
  return newShipment;
};

// Update shipment status
export const updateShipmentStatus = async (shipmentId, status) => {
  await delay(300);
  const shipment = mockShipments.find(s => s.id === shipmentId);
  if (!shipment) {
    throw new Error('Shipment not found');
  }
  shipment.status = status;
  shipment.timeline.push({
    date: new Date().toISOString().split('T')[0],
    status: status,
    location: shipment.destination
  });
  return shipment;
};

// Update customs status
export const updateCustomsStatus = async (shipmentId, customsStatus) => {
  await delay(300);
  const shipment = mockShipments.find(s => s.id === shipmentId);
  if (!shipment) {
    throw new Error('Shipment not found');
  }
  shipment.customsStatus = customsStatus;
  return shipment;
};

// Delete shipment
export const deleteShipment = async (shipmentId) => {
  await delay(300);
  const index = mockShipments.findIndex(s => s.id === shipmentId);
  if (index === -1) {
    throw new Error('Shipment not found');
  }
  mockShipments.splice(index, 1);
  return { success: true };
};

// Get shipment statistics
export const getShipmentStats = async () => {
  await delay(300);
  return mockStats;
};

export default {
  getAllShipments,
  getShipmentById,
  createShipment,
  updateShipmentStatus,
  updateCustomsStatus,
  deleteShipment,
  getShipmentStats
};

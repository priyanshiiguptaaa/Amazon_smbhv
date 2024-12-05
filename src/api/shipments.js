import { mockShipments } from '../data/mockShipments';

// Calculate stats based on mockShipments
const calculateStats = () => {
  const stats = {
    total: mockShipments.length,
    inTransit: 0,
    delivered: 0,
    processing: 0,
    pending: 0
  };

  mockShipments.forEach(shipment => {
    switch(shipment.status) {
      case 'In Transit':
        stats.inTransit++;
        break;
      case 'Delivered':
        stats.delivered++;
        break;
      case 'Processing':
        stats.processing++;
        break;
      case 'Pending':
        stats.pending++;
        break;
    }
  });

  return stats;
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Get all shipments
export const getAllShipments = async () => {
  await delay(500); // Simulate API delay
  return mockShipments;
};

// Get single shipment by ID
export const getShipmentById = async (shipmentId) => {
  await delay(300);
  const shipment = mockShipments.find(s => s.shipmentId === shipmentId);
  if (!shipment) throw new Error('Shipment not found');
  return shipment;
};

// Create new shipment
export const createShipment = async (shipmentData) => {
  await delay(500);
  const newShipment = {
    ...shipmentData,
    shipmentId: `SHP${String(mockShipments.length + 1).padStart(3, '0')}`,
  };
  mockShipments.push(newShipment);
  return newShipment;
};

// Update shipment status
export const updateShipmentStatus = async (shipmentId, status) => {
  await delay(300);
  const shipment = mockShipments.find(s => s.shipmentId === shipmentId);
  if (!shipment) throw new Error('Shipment not found');
  
  shipment.status = status;
  return shipment;
};

// Get shipment statistics
export const getShipmentStats = async () => {
  await delay(300);
  return calculateStats();
};

export default {
  getAllShipments,
  getShipmentById,
  createShipment,
  updateShipmentStatus,
  getShipmentStats
};

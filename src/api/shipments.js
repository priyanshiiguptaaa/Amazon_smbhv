import { mockShipments } from '../data/mockShipments';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const shipmentsApi = {
    getAllShipments: async () => {
        await delay(500); // Simulate network delay
        return mockShipments;
    },

    getShipmentById: async (shipmentId) => {
        await delay(300);
        const shipment = mockShipments.find(s => s.shipmentId === shipmentId);
        if (!shipment) throw new Error('Shipment not found');
        return shipment;
    },

    updateShipmentStatus: async (shipmentId, status) => {
        await delay(300);
        const shipment = mockShipments.find(s => s.shipmentId === shipmentId);
        if (!shipment) throw new Error('Shipment not found');
        shipment.status = status;
        return shipment;
    },

    updateCustomsClearance: async (shipmentId, status) => {
        await delay(300);
        const shipment = mockShipments.find(s => s.shipmentId === shipmentId);
        if (!shipment) throw new Error('Shipment not found');
        shipment.customsStatus = status;
        return shipment;
    },

    createShipment: async (shipmentData) => {
        await delay(500);
        const newShipment = {
            shipmentId: `SHP-${String(mockShipments.length + 1).padStart(3, '0')}`,
            status: 'Preparing',
            customsStatus: 'Pending',
            timeline: [
                { 
                    date: new Date().toISOString().split('T')[0], 
                    status: 'Order Received' 
                }
            ],
            ...shipmentData
        };
        mockShipments.push(newShipment);
        return newShipment;
    }
};

export default shipmentsApi;

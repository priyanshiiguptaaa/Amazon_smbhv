import React, { createContext, useContext, useState, useEffect } from 'react';
import shipmentsApi from '../api/shipments';

const ShipmentsContext = createContext();

export const useShipments = () => {
    const context = useContext(ShipmentsContext);
    if (!context) {
        throw new Error('useShipments must be used within a ShipmentsProvider');
    }
    return context;i
};

export const ShipmentsProvider = ({ children }) => {
    const [shipments, setShipments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchShipments = async () => {
        try {
            setLoading(true);
            const data = await shipmentsApi.getAllShipments();
            setShipments(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching shipments:', err);
            setError('Failed to fetch shipments');
        } finally {
            setLoading(false);
        }
    };

    const getShipment = async (shipmentId) => {
        try {
            const shipment = await shipmentsApi.getShipmentById(shipmentId);
            return shipment;
        } catch (err) {
            console.error('Error fetching shipment:', err);
            throw err;
        }
    };

    const updateShipmentStatus = async (shipmentId, status) => {
        try {
            const updatedShipment = await shipmentsApi.updateShipmentStatus(shipmentId, status);
            setShipments(prev => 
                prev.map(shipment => shipment.shipmentId === shipmentId ? updatedShipment : shipment)
            );
            return updatedShipment;
        } catch (err) {
            console.error('Error updating shipment status:', err);
            throw err;
        }
    };

    const updateCustomsClearance = async (shipmentId, status) => {
        try {
            const updatedShipment = await shipmentsApi.updateCustomsClearance(shipmentId, status);
            setShipments(prev => 
                prev.map(shipment => shipment.shipmentId === shipmentId ? updatedShipment : shipment)
            );
            return updatedShipment;
        } catch (err) {
            console.error('Error updating customs clearance:', err);
            throw err;
        }
    };

    useEffect(() => {
        fetchShipments();
    }, []);

    return (
        <ShipmentsContext.Provider 
            value={{
                shipments,
                loading,
                error,
                fetchShipments,
                getShipment,
                updateShipmentStatus,
                updateCustomsClearance
            }}
        >
            {children}
        </ShipmentsContext.Provider>
    );
};

export default ShipmentsContext;

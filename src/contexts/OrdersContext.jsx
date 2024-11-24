import React, { createContext, useContext, useState, useEffect } from 'react';
import ordersApi from '../api/orders';

const OrdersContext = createContext();

export const useOrders = () => {
    const context = useContext(OrdersContext);
    if (!context) {
        throw new Error('useOrders must be used within an OrdersProvider');
    }
    return context;
};

export const OrdersProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const data = await ordersApi.getAllOrders();
            setOrders(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching orders:', err);
            setError('Failed to fetch orders');
        } finally {
            setLoading(false);
        }
    };

    const getOrder = async (orderId) => {
        try {
            const order = await ordersApi.getOrderById(orderId);
            return order;
        } catch (err) {
            console.error('Error fetching order:', err);
            throw err;
        }
    };

    const updateOrderStatus = async (orderId, status) => {
        try {
            const updatedOrder = await ordersApi.updateOrderStatus(orderId, status);
            setOrders(prev => 
                prev.map(order => order.orderId === orderId ? updatedOrder : order)
            );
            return updatedOrder;
        } catch (err) {
            console.error('Error updating order status:', err);
            throw err;
        }
    };

    const createOrder = async (orderData) => {
        try {
            const newOrder = await ordersApi.createOrder(orderData);
            setOrders(prev => [...prev, newOrder]);
            return newOrder;
        } catch (err) {
            console.error('Error creating order:', err);
            throw err;
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const value = {
        orders,
        loading,
        error,
        fetchOrders,
        getOrder,
        updateOrderStatus,
        createOrder
    };

    return (
        <OrdersContext.Provider value={value}>
            {children}
        </OrdersContext.Provider>
    );
};

export default OrdersContext;

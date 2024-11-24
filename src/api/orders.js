import { mockOrders } from '../data/mockOrders';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const ordersApi = {
    // Get all orders
    getAllOrders: async () => {
        await delay(500); // Simulate network delay
        return mockOrders;
    },

    // Get order by ID
    getOrderById: async (orderId) => {
        await delay(300);
        const order = mockOrders.find(o => o.orderId === orderId);
        if (!order) throw new Error('Order not found');
        return order;
    },

    // Update order status
    updateOrderStatus: async (orderId, status) => {
        await delay(300);
        const order = mockOrders.find(o => o.orderId === orderId);
        if (!order) throw new Error('Order not found');
        order.status = status;
        return order;
    },

    // Create new order
    createOrder: async (orderData) => {
        await delay(500);
        const newOrder = {
            orderId: `ORD-${String(mockOrders.length + 1).padStart(3, '0')}`,
            orderDate: new Date().toISOString().split('T')[0],
            status: 'Pending',
            ...orderData
        };
        mockOrders.push(newOrder);
        return newOrder;
    }
};

export default ordersApi;

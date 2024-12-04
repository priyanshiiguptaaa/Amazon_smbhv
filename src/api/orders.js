import axios from 'axios';
import { mockOrders } from '../data/mockOrders';

const API_URL = 'http://localhost:5000/api';
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const ordersApi = {
    // Get all orders with optional filters
    getAllOrders: async (filters = {}) => {
        await delay(500);
        let filteredOrders = [...mockOrders];

        if (filters.status) {
            filteredOrders = filteredOrders.filter(order => order.status === filters.status);
        }
        if (filters.dateRange) {
            const { startDate, endDate } = filters.dateRange;
            filteredOrders = filteredOrders.filter(order => {
                const orderDate = new Date(order.orderDate);
                return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
            });
        }
        if (filters.customer) {
            filteredOrders = filteredOrders.filter(order => 
                order.customerName.toLowerCase().includes(filters.customer.toLowerCase())
            );
        }

        return filteredOrders;
    },

    // Get order by ID
    getOrderById: async (orderId) => {
        await delay(300);
        const order = mockOrders.find(o => o.orderId === orderId);
        if (!order) throw new Error('Order not found');
        return order;
    },

    // Create new order
    createOrder: async (orderData) => {
        await delay(500);
        const newOrder = {
            orderId: `ORD-${String(mockOrders.length + 1).padStart(3, '0')}`,
            orderDate: new Date().toISOString(),
            status: 'Pending',
            paymentStatus: 'Pending',
            invoiceNumber: `INV-${String(mockOrders.length + 1).padStart(3, '0')}`,
            ...orderData
        };
        mockOrders.push(newOrder);
        return newOrder;
    },

    // Update order status
    updateOrderStatus: async (orderId, status) => {
        await delay(300);
        const order = mockOrders.find(o => o.orderId === orderId);
        if (!order) throw new Error('Order not found');
        order.status = status;
        return order;
    },

    // Update payment status
    updatePaymentStatus: async (orderId, paymentStatus, paymentDetails) => {
        await delay(300);
        const order = mockOrders.find(o => o.orderId === orderId);
        if (!order) throw new Error('Order not found');
        order.paymentStatus = paymentStatus;
        order.paymentDetails = {
            ...order.paymentDetails,
            ...paymentDetails,
            lastUpdated: new Date().toISOString()
        };
        return order;
    },

    // Generate invoice
    generateInvoice: async (orderId) => {
        await delay(500);
        const order = mockOrders.find(o => o.orderId === orderId);
        if (!order) throw new Error('Order not found');
        
        // In a real application, this would generate a PDF
        const invoiceData = {
            invoiceNumber: order.invoiceNumber,
            orderDetails: order,
            generatedDate: new Date().toISOString(),
            dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
        };
        
        return invoiceData;
    },

    // Get order analytics
    getAnalytics: async (dateRange = {}) => {
        await delay(500);
        let relevantOrders = mockOrders;

        if (dateRange.startDate && dateRange.endDate) {
            relevantOrders = mockOrders.filter(order => {
                const orderDate = new Date(order.orderDate);
                return orderDate >= new Date(dateRange.startDate) && 
                       orderDate <= new Date(dateRange.endDate);
            });
        }

        const analytics = {
            totalOrders: relevantOrders.length,
            totalRevenue: relevantOrders.reduce((sum, order) => sum + order.totalAmount, 0),
            averageOrderValue: relevantOrders.reduce((sum, order) => sum + order.totalAmount, 0) / relevantOrders.length,
            ordersByStatus: relevantOrders.reduce((acc, order) => {
                acc[order.status] = (acc[order.status] || 0) + 1;
                return acc;
            }, {}),
            ordersByPaymentStatus: relevantOrders.reduce((acc, order) => {
                acc[order.paymentStatus] = (acc[order.paymentStatus] || 0) + 1;
                return acc;
            }, {}),
            topProducts: Object.entries(
                relevantOrders.flatMap(order => order.items)
                    .reduce((acc, item) => {
                        acc[item.name] = (acc[item.name] || 0) + item.quantity;
                        return acc;
                    }, {})
            ).sort(([,a], [,b]) => b - a).slice(0, 5)
        };

        return analytics;
    },

    // Get customer order history
    getCustomerOrderHistory: async (customerName) => {
        await delay(300);
        const customerOrders = mockOrders.filter(order => 
            order.customerName.toLowerCase() === customerName.toLowerCase()
        );
        
        return {
            orders: customerOrders,
            totalOrders: customerOrders.length,
            totalSpent: customerOrders.reduce((sum, order) => sum + order.totalAmount, 0),
            averageOrderValue: customerOrders.reduce((sum, order) => sum + order.totalAmount, 0) / customerOrders.length,
            mostOrderedProducts: Object.entries(
                customerOrders.flatMap(order => order.items)
                    .reduce((acc, item) => {
                        acc[item.name] = (acc[item.name] || 0) + item.quantity;
                        return acc;
                    }, {})
            ).sort(([,a], [,b]) => b - a)
        };
    }
};

export default ordersApi;

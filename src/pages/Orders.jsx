import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useOrders } from '../contexts/OrdersContext';
import { 
    Package, Search, Filter, Calendar, ChevronDown, Eye, 
    TrendingUp, AlertCircle, CheckCircle, Clock 
} from 'lucide-react';

const OrderStatusBadge = ({ status }) => {
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'shipped':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'processing':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
            {status}
        </span>
    );
};

const OrdersTable = ({ orders, onStatusChange }) => {
    const [sortField, setSortField] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');

    const handleSort = (field) => {
        setSortField(field);
        setSortDirection(current => current === 'asc' ? 'desc' : 'asc');
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await onStatusChange(orderId, newStatus);
        } catch (error) {
            console.error('Error updating order status:', error);
            // Handle error (show toast notification, etc.)
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search orders..."
                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                            <Filter className="h-4 w-4 mr-2" />
                            Filter
                        </button>
                        <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                            <Calendar className="h-4 w-4 mr-2" />
                            Date Range
                            <ChevronDown className="h-4 w-4 ml-1" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {['Order ID', 'Customer', 'Status', 'Items', 'Total', 'Date'].map((header) => (
                                <th
                                    key={header}
                                    onClick={() => handleSort(header.toLowerCase().replace(' ', '_'))}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                >
                                    <div className="flex items-center gap-1">
                                        {header}
                                        {sortField === header.toLowerCase().replace(' ', '_') && (
                                            <ChevronDown
                                                className={`h-4 w-4 transition-transform ${
                                                    sortDirection === 'desc' ? 'transform rotate-180' : ''
                                                }`}
                                            />
                                        )}
                                    </div>
                                </th>
                            ))}
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {orders.map((order) => (
                            <tr key={order.orderId} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                                    #{order.orderId}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {order.customerName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <OrderStatusBadge status={order.status} />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {order.itemCount}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                    ${order.totalAmount.toFixed(2)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(order.orderDate).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button 
                                        onClick={() => handleStatusChange(order.orderId, 'Shipped')}
                                        className="text-blue-600 hover:text-blue-900 inline-flex items-center"
                                    >
                                        <Eye className="h-4 w-4 mr-1" />
                                        Ship
                                    </button>
                                    <button 
                                        onClick={() => handleStatusChange(order.orderId, 'Delivered')}
                                        className="text-blue-600 hover:text-blue-900 inline-flex items-center"
                                    >
                                        <Eye className="h-4 w-4 mr-1" />
                                        Deliver
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const OrderStats = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Total Orders</span>
                    <Package className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-gray-900">{stats?.totalOrders || 0}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Active orders</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Processing</span>
                    <Clock className="h-5 w-5 text-yellow-600" />
                </div>
                <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-gray-900">{stats?.processing || 0}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Orders in process</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Shipped</span>
                    <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-gray-900">{stats?.shipped || 0}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Orders shipped</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Total Value</span>
                    <AlertCircle className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-gray-900">
                        ${(stats?.totalValue || 0).toFixed(2)}
                    </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Total order value</p>
            </div>
        </div>
    );
};

const Orders = () => {
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const { orders, loading, error, updateOrderStatus } = useOrders();

    // Calculate stats
    const stats = {
        totalOrders: orders.length,
        processing: orders.filter(order => order.status === 'Processing').length,
        shipped: orders.filter(order => order.status === 'Shipped').length,
        delivered: orders.filter(order => order.status === 'Delivered').length,
        totalValue: orders.reduce((total, order) => total + (order.totalAmount || 0), 0)
    };

    // Filter and search orders
    const filteredOrders = orders.filter(order => {
        const matchesSearch = 
            order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerLocation.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await updateOrderStatus(orderId, newStatus);
        } catch (error) {
            console.error('Error updating order status:', error);
            // Handle error (show toast notification, etc.)
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-red-600">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Orders Management</h1>
                <p className="text-gray-600">Track and manage your export orders</p>
            </div>

            <OrderStats stats={stats} />

            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
                    <div className="flex items-center space-x-4 w-full md:w-auto">
                        <div className="relative flex-1 md:flex-none">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search orders..."
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-64"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <select
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="all">All Status</option>
                                <option value="Processing">Processing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                        </div>
                    </div>
                </div>

                <OrdersTable 
                    orders={filteredOrders}
                    onStatusChange={handleStatusChange}
                />
            </div>
        </div>
    );
};

export default Orders;

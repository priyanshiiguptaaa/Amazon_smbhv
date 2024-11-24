import React, { useState } from 'react';
import { Package, Filter, Search, ChevronUp, ChevronDown, Truck, Clock, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import { useShipments } from '../contexts/ShipmentsContext';

const ShipmentStats = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Total Shipments</span>
                    <Package className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-gray-900">{stats?.total || 0}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Active shipments</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">In Transit</span>
                    <Truck className="h-5 w-5 text-yellow-600" />
                </div>
                <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-gray-900">{stats?.inTransit || 0}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">On the way</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Customs Clearance</span>
                    <FileText className="h-5 w-5 text-orange-600" />
                </div>
                <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-gray-900">{stats?.customsClearance || 0}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">In customs</p>
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
                <p className="text-xs text-gray-500 mt-1">Shipment value</p>
            </div>
        </div>
    );
};

const StatusBadge = ({ status }) => {
    const statusConfig = {
        'In Transit': { bg: 'bg-blue-100', text: 'text-blue-800', icon: Truck },
        'Delivered': { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
        'Customs Clearance': { bg: 'bg-orange-100', text: 'text-orange-800', icon: FileText },
        'Arrived at Port': { bg: 'bg-purple-100', text: 'text-purple-800', icon: Package }
    };

    const config = statusConfig[status] || statusConfig['In Transit'];
    const Icon = config.icon;

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
            <Icon className="w-4 h-4 mr-1" />
            {status}
        </span>
    );
};

const ShipmentsTable = ({ shipments, onStatusChange, onCustomsChange }) => {
    const [sortField, setSortField] = useState('shipmentDate');
    const [sortDirection, setSortDirection] = useState('desc');

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const tableHeaders = [
        { label: 'Shipment ID', field: 'shipmentId' },
        { label: 'Customer', field: 'customerName' },
        { label: 'Status', field: 'status' },
        { label: 'Origin', field: 'origin' },
        { label: 'Destination', field: 'destination' },
        { label: 'Carrier', field: 'carrier' },
        { label: 'Date', field: 'shipmentDate' }
    ];

    return (
        <div className="bg-white rounded-lg shadow-sm">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {tableHeaders.map(header => (
                                <th
                                    key={header.field}
                                    onClick={() => handleSort(header.field)}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                >
                                    <div className="flex items-center gap-1">
                                        {header.label}
                                        {sortField === header.field && (
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
                        {shipments.map((shipment) => (
                            <tr key={shipment.shipmentId} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                                    #{shipment.shipmentId}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {shipment.customerName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <StatusBadge status={shipment.status} />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {shipment.origin}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {shipment.destination}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {shipment.carrier}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(shipment.shipmentDate).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                    <button 
                                        onClick={() => onStatusChange(shipment.shipmentId, 'In Transit')}
                                        className="text-blue-600 hover:text-blue-900"
                                    >
                                        Update Status
                                    </button>
                                    <button 
                                        onClick={() => onCustomsChange(shipment.shipmentId, 'In Progress')}
                                        className="text-blue-600 hover:text-blue-900"
                                    >
                                        Update Customs
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

const ShipmentsPage = () => {
    const { shipments, loading, error, updateShipmentStatus, updateCustomsClearance } = useShipments();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    // Calculate stats
    const stats = {
        total: shipments.length,
        inTransit: shipments.filter(s => s.status === 'In Transit').length,
        customsClearance: shipments.filter(s => s.status === 'Customs Clearance').length,
        totalValue: shipments.reduce((total, s) => total + (s.customsValue || 0), 0)
    };

    // Filter shipments
    const filteredShipments = shipments.filter(shipment => {
        const matchesSearch = 
            shipment.shipmentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            shipment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            shipment.destination.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || shipment.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const handleStatusChange = async (shipmentId, newStatus) => {
        try {
            await updateShipmentStatus(shipmentId, newStatus);
        } catch (error) {
            console.error('Error updating shipment status:', error);
        }
    };

    const handleCustomsChange = async (shipmentId, newStatus) => {
        try {
            await updateCustomsClearance(shipmentId, newStatus);
        } catch (error) {
            console.error('Error updating customs status:', error);
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
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Shipments Management</h1>
                <p className="text-gray-600">Track and manage your export shipments</p>
            </div>

            <ShipmentStats stats={stats} />

            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
                    <div className="flex items-center space-x-4 w-full md:w-auto">
                        <div className="relative flex-1 md:flex-none">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search shipments..."
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
                                <option value="In Transit">In Transit</option>
                                <option value="Customs Clearance">Customs Clearance</option>
                                <option value="Arrived at Port">Arrived at Port</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                        </div>
                    </div>
                </div>

                <ShipmentsTable 
                    shipments={filteredShipments}
                    onStatusChange={handleStatusChange}
                    onCustomsChange={handleCustomsChange}
                />
            </div>
        </div>
    );
};

export default ShipmentsPage;
import React, { useState } from 'react';
import { Package, Filter, Search, ChevronUp, ChevronDown, Truck, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const ShipmentsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  // Sample shipments data
  const shipments = [
    { id: '1', trackingNumber: 'SHP001', destination: 'New York, NY', date: '2024-03-15', status: 'in-transit', customer: 'John Doe' },
    { id: '2', trackingNumber: 'SHP002', destination: 'Los Angeles, CA', date: '2024-03-14', status: 'delivered', customer: 'Jane Smith' },
    { id: '3', trackingNumber: 'SHP003', destination: 'Chicago, IL', date: '2024-03-13', status: 'pending', customer: 'Bob Johnson' },
    { id: '4', trackingNumber: 'SHP004', destination: 'Miami, FL', date: '2024-03-12', status: 'delayed', customer: 'Alice Brown' },
  ];

  const filteredShipments = shipments
    .filter(shipment => 
      (selectedStatus === 'all' || shipment.status === selectedStatus) &&
      (searchQuery === '' || 
        Object.values(shipment).some(value => 
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        ))
    )
    .sort((a, b) => {
      const modifier = sortDirection === 'asc' ? 1 : -1;
      return a[sortField] > b[sortField] ? modifier : -modifier;
    });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? 
      <ChevronUp className="h-4 w-4 inline" /> : 
      <ChevronDown className="h-4 w-4 inline" />;
  };

  const StatusBadge = ({ status }) => {
    const statusConfig = {
      'in-transit': { bg: 'bg-blue-100', text: 'text-blue-800', icon: Truck },
      'delivered': { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      'pending': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
      'delayed': { bg: 'bg-red-100', text: 'text-red-800', icon: AlertCircle }
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
        <Icon className="h-4 w-4 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-600">Shipments</h1>
          <p className="text-gray-500">Manage and track all your shipments</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setSelectedStatus('all')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors">
            <Package className="h-4 w-4 mr-2" />
            New Shipment
          </button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center mb-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search shipments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {['all', 'in-transit', 'delivered', 'pending', 'delayed'].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  selectedStatus === status
                    ? 'bg-blue-100 text-blue-800'
                    : 'text-gray-600 hover:bg-gray-100'
                } transition-colors`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Shipments Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Tracking #', 'Customer', 'Destination', 'Date', 'Status'].map((header, index) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort(['trackingNumber', 'customer', 'destination', 'date', 'status'][index])}
                  >
                    {header}
                    <SortIcon field={['trackingNumber', 'customer', 'destination', 'date', 'status'][index]} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredShipments.map((shipment) => (
                <tr 
                  key={shipment.id}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {shipment.trackingNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {shipment.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {shipment.destination}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(shipment.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={shipment.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShipmentsPage;
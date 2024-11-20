import React, { useState, useEffect } from 'react';
import { Package, FileText, Globe, TrendingUp, Search, Filter, Calendar, ChevronDown, RefreshCcw, Download, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const mockTimeData = [
  { month: 'Jan', exports: 20, imports: 15, revenue: 25000 },
  { month: 'Feb', exports: 35, imports: 25, revenue: 42000 },
  { month: 'Mar', exports: 25, imports: 20, revenue: 35000 },
  { month: 'Apr', exports: 40, imports: 30, revenue: 55000 },
  { month: 'May', exports: 30, imports: 25, revenue: 45000 },
  { month: 'Jun', exports: 45, imports: 35, revenue: 62000 },
];

const pieData = [
  { name: 'DHL', value: 35 },
  { name: 'FedEx', value: 25 },
  { name: 'UPS', value: 20 },
  { name: 'Others', value: 20 },
];

const COLORS = ['#FF9900', '#146EB4', '#17B26A', '#7E8B9C'];

const StatsCard = ({ title, value, subtitle, icon: Icon, trend }) => {
  const getTrendColor = (trend) => {
    if (!trend) return 'text-gray-600';
    return parseFloat(trend) >= 0 ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-600">{title}</span>
        <Icon className="h-5 w-5 text-blue-600" />
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        {trend && (
          <span className={`text-sm font-medium ${getTrendColor(trend)}`}>
            {trend}%
          </span>
        )}
      </div>
      <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
    </div>
  );
};

const ShipmentTable = ({ shipments = [] }) => {
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredShipments, setFilteredShipments] = useState(shipments);

  useEffect(() => {
    let filtered = [...shipments];
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(shipment => 
        Object.values(shipment).some(value => 
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
    
    // Apply sorting
    if (sortField) {
      filtered.sort((a, b) => {
        if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
    setFilteredShipments(filtered);
  }, [shipments, searchQuery, sortField, sortDirection]);

  const handleSort = (field) => {
    setSortField(field);
    setSortDirection(current => current === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search shipments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Tracking ID', 'Destination', 'Carrier', 'Status', 'Documentation'].map((header) => (
                <th
                  key={header}
                  onClick={() => handleSort(header.toLowerCase())}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center gap-2">
                    {header}
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredShipments.map((shipment) => (
              <tr key={shipment.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                  {shipment.trackingId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {shipment.destination}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {shipment.carrier}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${shipment.status === 'In Transit' ? 'bg-blue-100 text-blue-800' : 
                    shipment.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'}`}>
                    {shipment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="flex items-center text-blue-600 hover:text-blue-800">
                    <FileText className="h-4 w-4 mr-1" />
                    View
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

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [chartView, setChartView] = useState('bar');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const mockShipments = [
    {
      id: 1,
      trackingId: 'FF-2024-001',
      destination: 'United States',
      carrier: 'DHL Express',
      status: 'In Transit',
    },
    {
      id: 2,
      trackingId: 'FF-2024-002',
      destination: 'Europe',
      carrier: 'FedEx',
      status: 'Processing',
    },
    {
      id: 3,
      trackingId: 'FF-2024-003',
      destination: 'Asia',
      carrier: 'UPS',
      status: 'Delivered',
    },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500">Welcome back! Here's your shipping overview</p>
          </div>
          <button
            onClick={handleRefresh}
            className={`inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 ${
              isRefreshing ? 'animate-spin' : ''
            }`}
          >
            <RefreshCcw className="h-4 w-4 mr-2" />
            Refresh
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Active Shipments"
            value="24"
            subtitle="8 pending documentation"
            icon={Package}
            trend="+12.5"
          />
          <StatsCard
            title="Total Exports"
            value="156"
            subtitle="Last 30 days"
            icon={Globe}
            trend="+8.2"
          />
          <StatsCard
            title="Documentation"
            value="16/24"
            subtitle="Completed shipments"
            icon={FileText}
            trend="-2.4"
          />
          <StatsCard
            title="Growth"
            value="$45.2k"
            subtitle="Total revenue"
            icon={TrendingUp}
            trend="+15.3"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Main Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Shipping Analytics</h2>
              <div className="flex gap-2">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="border border-gray-300 rounded-md text-sm p-2"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                </select>
                <div className="flex border border-gray-300 rounded-md">
                  <button
                    onClick={() => setChartView('bar')}
                    className={`px-3 py-2 text-sm ${
                      chartView === 'bar' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
                    }`}
                  >
                    Bar
                  </button>
                  <button
                    onClick={() => setChartView('line')}
                    className={`px-3 py-2 text-sm ${
                      chartView === 'line' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
                    }`}
                  >
                    Line
                  </button>
                </div>
              </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                {chartView === 'bar' ? (
                  <BarChart data={mockTimeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="exports" fill="#FF9900" />
                    <Bar dataKey="imports" fill="#146EB4" />
                  </BarChart>
                ) : (
                  <LineChart data={mockTimeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="revenue" stroke="#FF9900" />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>

          {/* Carrier Distribution */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Carrier Distribution</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              {pieData.map((entry, index) => (
                <div key={entry.name} className="flex items-center justify-between py-1">
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm text-gray-600">{entry.name}</span>
                  </div>
                  <span className="text-sm font-medium">{entry.value}%</span>
                </div>
              ))}
            </div>
          </div>
          </div>

        {/* Recent Shipments Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Shipments</h2>
            <div className="flex items-center gap-2">
              <div className="flex items-center text-sm text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">
                <AlertCircle className="h-4 w-4 mr-1" />
                <span>2 shipments pending review</span>
              </div>
            </div>
          </div>
          <ShipmentTable shipments={mockShipments} />
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Showing {mockShipments.length} of {mockShipments.length} shipments
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                Previous
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white hover:shadow-lg transition-shadow cursor-pointer">
            <Package className="h-8 w-8 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Create Shipment</h3>
            <p className="text-blue-100 text-sm">Start a new shipping process</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white hover:shadow-lg transition-shadow cursor-pointer">
            <FileText className="h-8 w-8 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Documentation</h3>
            <p className="text-green-100 text-sm">Manage shipping documents</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white hover:shadow-lg transition-shadow cursor-pointer">
            <Globe className="h-8 w-8 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Track Shipment</h3>
            <p className="text-purple-100 text-sm">Monitor your shipments</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-6 text-white hover:shadow-lg transition-shadow cursor-pointer">
            <TrendingUp className="h-8 w-8 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Reports</h3>
            <p className="text-orange-100 text-sm">View analytics & insights</p>
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-8 border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <span>Last updated: {new Date().toLocaleString()}</span>
              <button 
                onClick={handleRefresh}
                className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <RefreshCcw className="h-4 w-4" />
                Refresh data
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span>Need help?</span>
              <a href="#" className="text-blue-600 hover:text-blue-800">Contact support</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
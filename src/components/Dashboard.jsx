import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import { 
  Package, FileText, Globe, TrendingUp, Search, Filter, Calendar, ChevronDown, RefreshCcw, Download 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell 
} from 'recharts';

// Mock Data
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

// Mock shipments data
const mockShipments = [
  {
    id: 1,
    reference: 'SHP001',
    destination: 'United States',
    status: 'In Transit',
    carrier: 'DHL',
    date: '2023-07-01',
  },
  {
    id: 2,
    reference: 'SHP002',
    destination: 'United Kingdom',
    status: 'Delivered',
    carrier: 'FedEx',
    date: '2023-07-02',
  },
  {
    id: 3,
    reference: 'SHP003',
    destination: 'Germany',
    status: 'Processing',
    carrier: 'UPS',
    date: '2023-07-03',
  },
];

// StatsCard Component
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

// ShipmentTable Component
const ShipmentTable = ({ shipments = [] }) => {
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredShipments, setFilteredShipments] = useState(shipments);

  useEffect(() => {
    let filtered = [...shipments];
    
    if (searchQuery) {
      filtered = filtered.filter(shipment => 
        Object.values(shipment).some(value => 
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
    
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
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
              <ChevronDown className="h-4 w-4 ml-1" />
            </button>
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              <Download className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Reference', 'Destination', 'Status', 'Carrier', 'Date'].map((header) => (
                <th
                  key={header}
                  onClick={() => handleSort(header.toLowerCase())}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center gap-1">
                    {header}
                    {sortField === header.toLowerCase() && (
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
            {filteredShipments.map((shipment) => (
              <tr key={shipment.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {shipment.reference}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {shipment.destination}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    shipment.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    shipment.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {shipment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {shipment.carrier}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {shipment.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900">
                    View Details
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

// Main Dashboard Component
const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.companyName || 'User'}!</h1>
        <p className="text-gray-600">Here's what's happening with your exports today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Shipments"
          value="156"
          subtitle="Last 30 days"
          icon={Package}
          trend="+12.5"
        />
        <StatsCard
          title="Documents Processed"
          value="89"
          subtitle="Last 30 days"
          icon={FileText}
          trend="+8.2"
        />
        <StatsCard
          title="Countries Exported"
          value="24"
          subtitle="Active destinations"
          icon={Globe}
        />
        <StatsCard
          title="Revenue"
          value="$142.5k"
          subtitle="Last 30 days"
          icon={TrendingUp}
          trend="+15.3"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Export Trends</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="exports" stroke="#146EB4" strokeWidth={2} />
                <Line type="monotone" dataKey="imports" stroke="#17B26A" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Carrier Distribution</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
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
          <div className="flex justify-center gap-4 mt-4">
            {pieData.map((entry, index) => (
              <div key={entry.name} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-sm text-gray-600">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm mb-8">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Shipments</h2>
        </div>
        <ShipmentTable shipments={mockShipments} />
      </div>
    </div>
  );
};

export default Dashboard;

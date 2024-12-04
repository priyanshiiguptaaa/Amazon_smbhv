import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import { Package, Truck, DollarSign, Filter, ArrowUpDown, ChevronLeft, ChevronRight, BarChart2 } from 'lucide-react';
import { getCarrierRates, generateShippingLabel } from '../utils/shippingUtils';
import { convertCurrency } from '../utils/businessUtils';
import { generateInvoice } from '../utils/invoiceUtils';
import { mockOrders } from '../data/mockOrders';
import { toast } from 'react-hot-toast';
import MLInsights from '../components/MLInsights';
import ReturnLabelsComponent from '../components/ReturnLabels';

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [carrierRates, setCarrierRates] = useState([]);
  const [currency, setCurrency] = useState('INR');  
  const [showAllCarriers, setShowAllCarriers] = useState(false);
  const [activeTab, setActiveTab] = useState('orders');
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: 'all',
    minAmount: '',
    maxAmount: ''
  });
  const [sortConfig, setSortConfig] = useState({ key: 'orderId', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const { user } = useAuth();

  // Filter orders
  const filteredOrders = mockOrders.filter(order => {
    if (filters.status !== 'all' && order.status !== filters.status) return false;
    if (filters.minAmount && order.totalAmount < parseFloat(filters.minAmount)) return false;
    if (filters.maxAmount && order.totalAmount > parseFloat(filters.maxAmount)) return false;
    return true;
  });

  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  // Paginate orders
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(sortedOrders.length / ordersPerPage);

  // Analytics data
  const analytics = {
    totalOrders: filteredOrders.length,
    totalRevenue: filteredOrders.reduce((sum, order) => sum + order.totalAmount, 0),
    averageOrderValue: filteredOrders.reduce((sum, order) => sum + order.totalAmount, 0) / filteredOrders.length,
    statusBreakdown: filteredOrders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {})
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleCompareRates = (order) => {
    // Estimate total weight based on quantity (mock calculation)
    const totalWeight = order.items.reduce((total, item) => total + (item.quantity * 0.5), 0);
    const rates = getCarrierRates(totalWeight, order.destination);
    setCarrierRates(rates);
    setSelectedOrder(order);
  };

  const handleGenerateInvoice = async (order) => {
    const toastId = toast.loading('Generating invoice...');
    try {
      const invoice = await generateInvoice(order);
      toast.success('Invoice generated successfully!', { id: toastId });
      
      // Log success but don't expose internal details to the user
      console.log('Generated Invoice:', invoice);
      window.open(invoice.pdfUrl, '_blank');
    } catch (error) {
      console.error('Error generating invoice:', error);
      
      // Show user-friendly error message
      const errorMessage = error.message.includes('Invalid') 
        ? 'Invalid order data. Please try again.'
        : 'Failed to generate invoice. Please try again later.';
      
      toast.error(errorMessage, { id: toastId });
    }
  };

  const handleCurrencyChange = (e) => {
    const newCurrency = e.target.value;
    setCurrency(newCurrency);
  };

  const formatPrice = (price) => {
    const currencySymbols = {
      INR: '₹',
      USD: '$',
      EUR: '€',
      GBP: '£',
      JPY: '¥',
      AUD: 'A$'
    };

    let formattedPrice;
    if (currency === 'INR') {
      // Format in Indian numbering system (lakhs and crores)
      formattedPrice = price.toLocaleString('en-IN', {
        maximumFractionDigits: 0,
        style: 'currency',
        currency: 'INR'
      });
    } else {
      // Convert from INR to selected currency
      const conversionRates = {
        USD: 0.012,  // 1 INR = 0.012 USD
        EUR: 0.011,  // 1 INR = 0.011 EUR
        GBP: 0.0095, // 1 INR = 0.0095 GBP
        JPY: 1.77,   // 1 INR = 1.77 JPY
        AUD: 0.018   // 1 INR = 0.018 AUD
      };

      const convertedPrice = price * (conversionRates[currency] || 1);
      formattedPrice = currencySymbols[currency] + convertedPrice.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }

    return formattedPrice;
  };

  const handleCarrierSelect = (rate) => {
    // Handle carrier selection
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Orders</h1>
        <button
          onClick={() => setShowAnalytics(!showAnalytics)}
          className="flex items-center gap-2 px-4 py-2 bg-[#232F3E] text-white rounded hover:bg-[#232F3E]/90"
        >
          <BarChart2 className="w-4 h-4" />
          {showAnalytics ? 'Hide Analytics' : 'Show Analytics'}
        </button>
      </div>

      {showAnalytics && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm text-gray-500">Total Orders</h3>
            <p className="text-2xl font-bold">{analytics.totalOrders}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm text-gray-500">Total Revenue</h3>
            <p className="text-2xl font-bold">{formatPrice(analytics.totalRevenue)}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm text-gray-500">Average Order Value</h3>
            <p className="text-2xl font-bold">{formatPrice(analytics.averageOrderValue)}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm text-gray-500">Status Breakdown</h3>
            <div className="text-sm">
              {Object.entries(analytics.statusBreakdown).map(([status, count]) => (
                <div key={status} className="flex justify-between mt-1">
                  <span>{status}:</span>
                  <span className="font-medium">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('orders')}
            className={`${
              activeTab === 'orders'
                ? 'border-[#FF9900] text-[#FF9900]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium`}
          >
            Orders List
          </button>
          <button
            onClick={() => setActiveTab('returnLabels')}
            className={`${
              activeTab === 'returnLabels'
                ? 'border-[#FF9900] text-[#FF9900]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium`}
          >
            Return Labels
          </button>
        </nav>
      </div>

      {activeTab === 'orders' ? (
        <>
          {/* Filters Section */}
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="all">All Status</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Min Amount</label>
                <input
                  type="number"
                  value={filters.minAmount}
                  onChange={(e) => setFilters(prev => ({ ...prev, minAmount: e.target.value }))}
                  className="w-full p-2 border rounded-md"
                  placeholder="Min Amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Amount</label>
                <input
                  type="number"
                  value={filters.maxAmount}
                  onChange={(e) => setFilters(prev => ({ ...prev, maxAmount: e.target.value }))}
                  className="w-full p-2 border rounded-md"
                  placeholder="Max Amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                <select
                  value={currency}
                  onChange={handleCurrencyChange}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="JPY">JPY</option>
                  <option value="AUD">AUD</option>
                </select>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Orders List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow overflow-hidden mb-4">
                <table className="min-w-full">
                  <thead className="bg-[#232F3E] text-white">
                    <tr>
                      <th 
                        className="px-6 py-3 text-left cursor-pointer"
                        onClick={() => handleSort('orderId')}
                      >
                        <div className="flex items-center gap-2">
                          Order ID
                          <ArrowUpDown className="w-4 h-4" />
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-left cursor-pointer"
                        onClick={() => handleSort('customerName')}
                      >
                        <div className="flex items-center gap-2">
                          Customer
                          <ArrowUpDown className="w-4 h-4" />
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-left cursor-pointer"
                        onClick={() => handleSort('totalAmount')}
                      >
                        <div className="flex items-center gap-2">
                          Value
                          <ArrowUpDown className="w-4 h-4" />
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-left cursor-pointer"
                        onClick={() => handleSort('status')}
                      >
                        <div className="flex items-center gap-2">
                          Status
                          <ArrowUpDown className="w-4 h-4" />
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentOrders.map((order) => (
                      <tr key={order.orderId} className="hover:bg-gray-50">
                        <td className="px-6 py-4">{order.orderId}</td>
                        <td className="px-6 py-4">{order.customerName}</td>
                        <td className="px-6 py-4">{formatPrice(order.totalAmount)}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-sm ${
                            order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                            order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleCompareRates(order)}
                              className="p-2 text-[#FF9900] hover:bg-[#FF9900]/10 rounded-lg"
                              title="Compare Carrier Rates"
                            >
                              <Package className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleGenerateInvoice(order)}
                              className="p-2 text-[#FF9900] hover:bg-[#FF9900]/10 rounded-lg"
                              title="Generate Invoice"
                            >
                              <DollarSign className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing {indexOfFirstOrder + 1} to {Math.min(indexOfLastOrder, sortedOrders.length)} of {sortedOrders.length} orders
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 border rounded hover:bg-gray-50 disabled:opacity-50"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 border rounded hover:bg-gray-50 disabled:opacity-50"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1">
              {/* Carrier Rates */}
              {selectedOrder && (
                <div className="bg-white rounded-lg shadow p-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Available Carriers
                    </label>
                    <button
                      onClick={() => setShowAllCarriers(!showAllCarriers)}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      {showAllCarriers ? 'Show Less' : 'Show All'}
                    </button>
                  </div>
                  <div className={`grid grid-cols-1 gap-2 ${showAllCarriers ? '' : 'max-h-32 overflow-y-auto'}`}>
                    {carrierRates.map((rate, index) => (
                      <div
                        key={index}
                        className="p-3 border rounded-lg hover:border-[#FF9900] transition-colors"
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <Truck className="w-4 h-4 text-gray-500" />
                          <div>
                            <div className="text-sm font-medium">{rate.carrier}</div>
                            <div className="text-xs text-gray-500">
                              Est. {rate.estimatedDays} days
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold">{formatPrice(rate.rate)}</span>
                          <button
                            onClick={async () => {
                              try {
                                toast.loading('Generating shipping label...');
                                const label = await generateShippingLabel({
                                  ...selectedOrder,
                                  carrier: rate.carrier
                                });
                                toast.success('Shipping label generated!');
                                setSelectedOrder(null);
                              } catch (error) {
                                toast.error('Failed to generate label');
                                console.error('Error:', error);
                              }
                            }}
                            className="px-3 py-1 bg-[#FF9900] text-white text-sm rounded hover:bg-[#FF9900]/90 transition-colors"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ML Insights Section */}
              {selectedOrder && (
                <div className="sticky top-4">
                  <div className="bg-white rounded-lg shadow p-4">
                    <h2 className="text-xl font-semibold mb-3">ML Insights</h2>
                    <MLInsights 
                      shipmentData={{
                        origin: selectedOrder.origin,
                        destination: selectedOrder.destination,
                        carrier: selectedOrder.carrier,
                        weight: selectedOrder.weight,
                        route: selectedOrder.route
                      }}
                      productData={{
                        id: selectedOrder.productId,
                        category: selectedOrder.category,
                        price: selectedOrder.price
                      }}
                      marketData={{
                        region: selectedOrder.region,
                        season: selectedOrder.season
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <ReturnLabelsComponent orders={mockOrders} />
      )}
    </div>
  );
};

export default Orders;

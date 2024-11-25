import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { Package, Truck, DollarSign } from 'lucide-react';
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
  const [currency, setCurrency] = useState('USD');
  const [showAllCarriers, setShowAllCarriers] = useState(false);
  const [activeTab, setActiveTab] = useState('orders');
  const { user } = useAuth();

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

  const formatPrice = (price, originalCurrency = 'USD') => {
    try {
      const converted = convertCurrency(price, originalCurrency, currency);
      return new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: currency 
      }).format(converted);
    } catch (error) {
      return price;
    }
  };

  const handleCarrierSelect = (rate) => {
    // Handle carrier selection
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

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
          {/* Top Controls Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            {/* Currency Selector */}
            <div className="bg-white rounded-lg shadow p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="INR">INR</option>
              </select>
            </div>

            {/* Carrier Rates */}
            {selectedOrder && (
              <div className="bg-white rounded-lg shadow p-4 lg:col-span-2">
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
                <div className={`grid grid-cols-2 md:grid-cols-3 gap-2 ${showAllCarriers ? '' : 'max-h-32 overflow-y-auto'}`}>
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
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Orders List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-[#232F3E] text-white">
                    <tr>
                      <th className="px-6 py-3 text-left">Order ID</th>
                      <th className="px-6 py-3 text-left">Customer</th>
                      <th className="px-6 py-3 text-left">Value</th>
                      <th className="px-6 py-3 text-left">Status</th>
                      <th className="px-6 py-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockOrders.map((order) => (
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
            </div>

            {/* ML Insights Section */}
            {selectedOrder && (
              <div className="lg:col-span-1">
                <div className="sticky top-4">
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
        </>
      ) : (
        <div className="bg-white rounded-lg shadow">
          <ReturnLabelsComponent orders={mockOrders} />
        </div>
      )}
    </div>
  );
};

export default Orders;

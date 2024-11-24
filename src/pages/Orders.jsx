import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { Package, FileText } from 'lucide-react';
import { getCarrierRates, generateShippingLabel } from '../utils/shippingUtils';
import { convertCurrency } from '../utils/businessUtils';
import { generateInvoice } from '../utils/invoiceUtils';
import { mockOrders } from '../data/mockOrders';
import { toast } from 'react-hot-toast';

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [carrierRates, setCarrierRates] = useState([]);
  const [currency, setCurrency] = useState('USD');
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

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#0F1111]">Orders</h1>
          <p className="text-[#565959] mt-1">Manage and track your export orders</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={currency}
            onChange={handleCurrencyChange}
            className="p-2 border rounded-lg focus:outline-none focus:border-[#FF9900]"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="INR">INR</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
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
          <tbody className="divide-y divide-gray-200">
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
                      <FileText className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Carrier Rates Modal */}
      {selectedOrder && carrierRates.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Carrier Rates for {selectedOrder.orderId}</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              {carrierRates.map((rate) => (
                <div
                  key={rate.carrier}
                  className="p-4 border rounded-lg flex items-center justify-between hover:border-[#FF9900] transition-colors"
                >
                  <div>
                    <h3 className="font-semibold">{rate.carrier}</h3>
                    <p className="text-sm text-gray-600">
                      Estimated delivery: {rate.estimatedDays} days
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">{formatPrice(rate.rate)}</p>
                    <button
                      className="mt-2 px-4 py-2 bg-[#FF9900] text-white rounded-lg hover:bg-[#FF9900]/90 transition-colors"
                      onClick={async () => {
                        const label = await generateShippingLabel({
                          ...selectedOrder,
                          carrier: rate.carrier
                        });
                        console.log('Generated Label:', label);
                        setSelectedOrder(null);
                      }}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;

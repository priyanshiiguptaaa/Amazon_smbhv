import React, { useState, useEffect } from 'react';
import { compareShippingRates } from '../../api/shipping';
import { TrendingUp, Clock, DollarSign, Truck } from 'lucide-react';

const RateComparison = ({ shipmentId }) => {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRate, setSelectedRate] = useState(null);

  useEffect(() => {
    fetchRates();
  }, [shipmentId]);

  const fetchRates = async () => {
    setLoading(true);
    try {
      const ratesData = await compareShippingRates({ shipmentId });
      setRates(ratesData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch shipping rates');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectRate = (rate) => {
    setSelectedRate(rate);
    // Additional logic for rate selection can be added here
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 bg-red-50 rounded-lg">
        <p>{error}</p>
        <button 
          onClick={fetchRates}
          className="mt-2 text-sm text-red-600 hover:text-red-800"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Available Shipping Rates</h2>
        <button 
          onClick={fetchRates}
          className="text-blue-500 hover:text-blue-700 flex items-center gap-2"
        >
          <TrendingUp className="h-4 w-4" />
          Refresh Rates
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rates.map((rate) => (
          <div 
            key={rate.carrierId}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              selectedRate?.carrierId === rate.carrierId
                ? 'border-blue-500 bg-blue-50'
                : 'hover:border-gray-400'
            }`}
            onClick={() => handleSelectRate(rate)}
          >
            <div className="flex items-center gap-3 mb-3">
              <img 
                src={rate.carrierLogo} 
                alt={rate.carrierName}
                className="h-8 w-auto"
              />
              <div>
                <h3 className="font-medium">{rate.carrierName}</h3>
                <p className="text-sm text-gray-500">{rate.serviceName}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-sm">
                  {rate.estimatedDays} {rate.estimatedDays === 1 ? 'day' : 'days'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-gray-400" />
                <span className="text-sm">{rate.serviceType}</span>
              </div>
            </div>

            <div className="mt-4 flex items-baseline justify-between">
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-green-500" />
                <span className="text-xl font-bold text-green-600">
                  ₹{rate.totalRate.toFixed(2)}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                {rate.guaranteed ? 'Guaranteed' : 'Estimated'}
              </span>
            </div>

            <button
              className={`mt-4 w-full py-2 px-4 rounded-md transition-colors ${
                selectedRate?.carrierId === rate.carrierId
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {selectedRate?.carrierId === rate.carrierId ? 'Selected' : 'Select Rate'}
            </button>
          </div>
        ))}
      </div>

      {rates.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No shipping rates available for this shipment</p>
        </div>
      )}
    </div>
  );
};

export default RateComparison;

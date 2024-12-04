import React, { useState, useEffect } from 'react';
import { getShipmentTracking } from '../../api/shipping';
import { Truck, MapPin, Package, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const TrackingInfo = ({ shipmentId }) => {
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTrackingInfo();
  }, [shipmentId]);

  const fetchTrackingInfo = async () => {
    setLoading(true);
    try {
      const data = await getShipmentTracking(shipmentId);
      setTrackingData(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tracking information');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'text-green-500';
      case 'in transit':
        return 'text-blue-500';
      case 'exception':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return CheckCircle;
      case 'in transit':
        return Truck;
      case 'exception':
        return AlertTriangle;
      default:
        return Package;
    }
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
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-red-800">Error Fetching Tracking Info</h3>
            <p className="text-sm text-red-700 mt-1">{error}</p>
            <button 
              onClick={fetchTrackingInfo}
              className="mt-2 text-sm text-red-600 hover:text-red-800"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!trackingData) {
    return (
      <div className="text-center py-8">
        <Package className="h-12 w-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-500">No tracking information available</p>
      </div>
    );
  }

  const StatusIcon = getStatusIcon(trackingData.currentStatus);

  return (
    <div className="space-y-6">
      {/* Current Status */}
      <div className="bg-white border rounded-lg p-6">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-full ${getStatusColor(trackingData.currentStatus)} bg-opacity-10`}>
            <StatusIcon className={`h-6 w-6 ${getStatusColor(trackingData.currentStatus)}`} />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{trackingData.currentStatus}</h3>
            <p className="text-sm text-gray-500">
              Last updated: {new Date(trackingData.lastUpdate).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Estimated Delivery */}
      {trackingData.estimatedDelivery && (
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm font-medium text-blue-900">
                Estimated Delivery
              </p>
              <p className="text-sm text-blue-700">
                {new Date(trackingData.estimatedDelivery).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tracking Timeline */}
      <div className="space-y-4">
        <h3 className="font-medium">Tracking History</h3>
        <div className="space-y-6">
          {trackingData.events.map((event, index) => (
            <div key={index} className="relative">
              {index !== trackingData.events.length - 1 && (
                <div className="absolute top-6 left-4 bottom-0 w-0.5 bg-gray-200" />
              )}
              <div className="flex gap-4">
                <div className={`relative z-10 rounded-full p-2 ${
                  index === 0 ? getStatusColor(event.status) + ' bg-opacity-10' : 'bg-gray-100'
                }`}>
                  <MapPin className={`h-4 w-4 ${
                    index === 0 ? getStatusColor(event.status) : 'text-gray-400'
                  }`} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{event.status}</p>
                  <p className="text-sm text-gray-500">{event.location}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(event.timestamp).toLocaleString()}
                  </p>
                  {event.details && (
                    <p className="text-sm text-gray-600 mt-1">{event.details}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackingInfo;

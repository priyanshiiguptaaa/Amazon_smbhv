import React, { useState, useEffect } from 'react';
import { getContainerStatus, updateContainerDetails, getTemperatureData } from '../../api/shipping';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const ContainerManagement = ({ containerId }) => {
  const [containerData, setContainerData] = useState(null);
  const [tempData, setTempData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [containerInfo, temperatureInfo] = await Promise.all([
          getContainerStatus(containerId),
          getTemperatureData(containerId, { last: '24h' })
        ]);
        setContainerData(containerInfo);
        setTempData(temperatureInfo);
      } catch (err) {
        setError('Failed to fetch container data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 300000); // Update every 5 minutes
    return () => clearInterval(interval);
  }, [containerId]);

  if (loading) return <div className="text-center py-4">Loading container data...</div>;
  if (error) return <div className="text-red-500 py-4">{error}</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Container Management</h2>
      
      {/* Container Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="border p-4 rounded">
          <h3 className="font-medium mb-2">Container Information</h3>
          <div className="space-y-2">
            <div>ID: {containerData.containerId}</div>
            <div>Status: 
              <span className={`ml-2 px-2 py-1 rounded text-sm ${
                containerData.status === 'Active' ? 'bg-green-100 text-green-800' :
                containerData.status === 'Warning' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {containerData.status}
              </span>
            </div>
            <div>Location: {containerData.currentLocation}</div>
            <div>Last Updated: {new Date(containerData.lastUpdate).toLocaleString()}</div>
          </div>
        </div>

        {/* Temperature Monitoring */}
        <div className="border p-4 rounded">
          <h3 className="font-medium mb-2">Temperature Monitoring</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={tempData}>
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="temperature" 
                  stroke="#2563eb" 
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Current: {tempData[tempData.length - 1]?.temperature}°C
          </div>
        </div>
      </div>

      {/* Alerts and Thresholds */}
      <div className="border p-4 rounded">
        <h3 className="font-medium mb-2">Temperature Alerts</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Min Temperature (°C)</label>
            <input 
              type="number" 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              value={containerData.tempThresholds?.min}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Max Temperature (°C)</label>
            <input 
              type="number" 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              value={containerData.tempThresholds?.max}
            />
          </div>
        </div>
        <button 
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Update Thresholds
        </button>
      </div>
    </div>
  );
};

export default ContainerManagement;

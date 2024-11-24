import React, { useState, useEffect } from 'react';
import { 
  performQualityInspection,
  trackBatch,
  monitorFreshness,
  gradeProduct,
  analyzeSample
} from '../utils/qualityUtils';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Thermometer, Droplets, Award, Flask, Truck } from 'lucide-react';
import toast from 'react-hot-toast';

const QualityControl = ({ batchId, shipmentId }) => {
  const [qualityData, setQualityData] = useState(null);
  const [batchData, setBatchData] = useState(null);
  const [freshnessData, setFreshnessData] = useState(null);
  const [gradeData, setGradeData] = useState(null);
  const [labData, setLabData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [quality, batch, freshness, grade, lab] = await Promise.all([
          performQualityInspection({ id: batchId }),
          trackBatch(batchId),
          monitorFreshness(shipmentId),
          gradeProduct({ id: batchId }),
          analyzeSample(batchId)
        ]);

        setQualityData(quality);
        setBatchData(batch);
        setFreshnessData(freshness);
        setGradeData(grade);
        setLabData(lab);
      } catch (error) {
        console.error('Error fetching quality data:', error);
        toast.error('Failed to load quality control data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [batchId, shipmentId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Quality Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-2">
            <Thermometer className="text-blue-500" />
            <h3 className="text-lg font-semibold">Temperature</h3>
          </div>
          <p className="text-2xl font-bold mt-2">
            {qualityData?.parameters.temperature.value}°C
          </p>
          <p className="text-sm text-gray-500">
            Range: {qualityData?.parameters.temperature.allowedRange}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-2">
            <Droplets className="text-blue-500" />
            <h3 className="text-lg font-semibold">Humidity</h3>
          </div>
          <p className="text-2xl font-bold mt-2">
            {qualityData?.parameters.humidity.value}%
          </p>
          <p className="text-sm text-gray-500">
            Range: {qualityData?.parameters.humidity.allowedRange}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-2">
            <Award className="text-blue-500" />
            <h3 className="text-lg font-semibold">Quality Score</h3>
          </div>
          <p className="text-2xl font-bold mt-2">{qualityData?.overallScore}/100</p>
          <p className="text-sm text-gray-500">Premium Grade</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-2">
            <Flask className="text-blue-500" />
            <h3 className="text-lg font-semibold">Lab Status</h3>
          </div>
          <p className="text-2xl font-bold mt-2 text-green-500">Passed</p>
          <p className="text-sm text-gray-500">All Parameters Clear</p>
        </div>
      </div>

      {/* Temperature Chart */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-4">Temperature Monitoring</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={freshnessData?.conditions.temperature}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#2563eb"
                name="Temperature (°C)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Batch Information */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Truck className="text-blue-500" />
          <h3 className="text-lg font-semibold">Batch Information</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold">Origin</h4>
            <p className="text-gray-600">Farm: {batchData?.origin.farm}</p>
            <p className="text-gray-600">Location: {batchData?.origin.location}</p>
            <p className="text-gray-600">
              Harvest Date: {new Date(batchData?.origin.harvestDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <h4 className="font-semibold">Processing</h4>
            <p className="text-gray-600">Facility: {batchData?.processing.facility}</p>
            <p className="text-gray-600">
              Date: {new Date(batchData?.processing.date).toLocaleDateString()}
            </p>
            <p className="text-gray-600">Duration: {batchData?.processing.duration}</p>
          </div>
        </div>
      </div>

      {/* Quality Checks */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-4">Quality Check History</h3>
        <div className="space-y-4">
          {batchData?.qualityChecks.map((check, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b pb-2"
            >
              <div>
                <p className="font-semibold">{check.stage}</p>
                <p className="text-sm text-gray-500">
                  {new Date(check.date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <p className="text-sm text-gray-600">Inspector: {check.inspector}</p>
                <p className="font-semibold text-blue-500">{check.score}/100</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lab Analysis Results */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-4">Laboratory Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <h4 className="font-semibold">Pesticides</h4>
            <p className="text-green-500">{labData?.results.pesticides.status}</p>
            <p className="text-sm text-gray-500">
              {labData?.results.pesticides.details}
            </p>
          </div>
          <div>
            <h4 className="font-semibold">Heavy Metals</h4>
            <p className="text-green-500">{labData?.results.heavyMetals.status}</p>
            <p className="text-sm text-gray-500">
              {labData?.results.heavyMetals.details}
            </p>
          </div>
          <div>
            <h4 className="font-semibold">Microbiological</h4>
            <p className="text-green-500">{labData?.results.microbiological.status}</p>
            <p className="text-sm text-gray-500">
              TPC: {labData?.results.microbiological.totalPlateCount}
            </p>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
        <ul className="list-disc list-inside space-y-2">
          {qualityData?.recommendations.map((rec, index) => (
            <li key={index} className="text-gray-600">{rec}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QualityControl;

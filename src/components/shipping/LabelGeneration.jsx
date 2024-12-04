import React, { useState } from 'react';
import { generateShippingLabel } from '../../api/shipping';
import { Printer, Download, Check, AlertCircle } from 'lucide-react';

const LabelGeneration = ({ shipmentId }) => {
  const [labelData, setLabelData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateLabel = async () => {
    setLoading(true);
    try {
      const response = await generateShippingLabel(shipmentId);
      setLabelData(response);
      setError(null);
    } catch (err) {
      setError('Failed to generate shipping label');
    } finally {
      setLoading(false);
    }
  };

  const downloadLabel = () => {
    if (labelData?.labelUrl) {
      window.open(labelData.labelUrl, '_blank');
    }
  };

  const printLabel = () => {
    if (labelData?.labelUrl) {
      const printWindow = window.open(labelData.labelUrl, '_blank');
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Shipping Label</h2>
        {!labelData && (
          <button
            onClick={generateLabel}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2"
            disabled={loading}
          >
            <Printer className="h-4 w-4" />
            Generate Label
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-red-800">Error Generating Label</h3>
            <p className="text-sm text-red-700 mt-1">{error}</p>
            <button 
              onClick={generateLabel}
              className="mt-2 text-sm text-red-600 hover:text-red-800"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {labelData && (
        <div className="space-y-6">
          {/* Label Preview */}
          <div className="border rounded-lg p-6 bg-gray-50">
            <div className="aspect-[8.5/11] bg-white shadow-sm rounded-md p-4">
              {labelData.previewUrl ? (
                <img 
                  src={labelData.previewUrl} 
                  alt="Shipping Label Preview" 
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Label Preview Not Available
                </div>
              )}
            </div>
          </div>

          {/* Label Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium">Shipping Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Carrier:</span>
                  <p>{labelData.carrier}</p>
                </div>
                <div>
                  <span className="text-gray-500">Service:</span>
                  <p>{labelData.service}</p>
                </div>
                <div>
                  <span className="text-gray-500">Tracking Number:</span>
                  <p className="font-mono">{labelData.trackingNumber}</p>
                </div>
                <div>
                  <span className="text-gray-500">Created:</span>
                  <p>{new Date(labelData.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Actions</h3>
              <div className="flex gap-3">
                <button
                  onClick={downloadLabel}
                  className="flex-1 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 flex items-center justify-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download
                </button>
                <button
                  onClick={printLabel}
                  className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center justify-center gap-2"
                >
                  <Printer className="h-4 w-4" />
                  Print
                </button>
              </div>
              <div className="text-sm text-gray-500">
                Label will expire in 24 hours
              </div>
            </div>
          </div>

          {/* Label Status */}
          <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-md">
            <Check className="h-5 w-5" />
            <span>Label generated successfully</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LabelGeneration;

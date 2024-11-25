import React from 'react';
import ReturnLabelsComponent from '../components/ReturnLabels';

// Sample order data - in a real app, this would come from your backend
const sampleOrders = [
  {
    orderNumber: 'ORD-2024-001',
    customerName: 'John Smith',
    shippingAddress: '123 Main St, New York, NY 10001, USA',
    status: 'Delivered',
    date: '2024-01-15'
  },
  {
    orderNumber: 'ORD-2024-002',
    customerName: 'Emma Johnson',
    shippingAddress: '456 Park Ave, Los Angeles, CA 90001, USA',
    status: 'Delivered',
    date: '2024-01-16'
  },
  {
    orderNumber: 'ORD-2024-003',
    customerName: 'Michael Brown',
    shippingAddress: '789 Oak Rd, Chicago, IL 60601, USA',
    status: 'Delivered',
    date: '2024-01-17'
  }
];

const ReturnLabelsPage = () => {
  return (
    <div className="min-h-screen bg-[#EAEDED] py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-[#0F1111]">Return Labels</h1>
          <p className="text-[#565959] mt-2">
            Generate and print return labels for your orders. Including return labels with your shipments can improve customer satisfaction and increase repeat purchases.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-[#D5D9D9]">
            <h2 className="text-xl font-medium text-[#0F1111]">Return Label Management</h2>
            <p className="text-[#565959] mt-1">
              Search for orders and generate return labels. You can print labels directly or download them as files.
            </p>
          </div>

          <ReturnLabelsComponent orders={sampleOrders} />
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-[#0F1111] mb-2">Benefits of Including Return Labels</h3>
            <ul className="space-y-2 text-[#565959]">
              <li>• Improved customer satisfaction</li>
              <li>• Increased likelihood of repeat purchases</li>
              <li>• Streamlined return process</li>
              <li>• Better tracking of returns</li>
              <li>• Professional appearance</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-[#0F1111] mb-2">Return Label Guidelines</h3>
            <ul className="space-y-2 text-[#565959]">
              <li>• Print labels on quality paper</li>
              <li>• Ensure barcode is clearly visible</li>
              <li>• Include return instructions</li>
              <li>• Verify shipping addresses</li>
              <li>• Keep copies for your records</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnLabelsPage;

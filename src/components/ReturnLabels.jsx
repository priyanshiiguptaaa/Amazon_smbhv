import React, { useState } from 'react';
import { Printer, Download, Search } from 'lucide-react';

const ReturnLabels = ({ orders = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrders, setSelectedOrders] = useState([]);

  const filteredOrders = orders.filter(order => 
    order?.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order?.customerName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectOrder = (orderId) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const generateReturnLabel = (order) => {
    // This would connect to a shipping API to generate actual return labels
    // For now, we'll create a simple label format
    const labelContent = `
      Return Label
      ------------------
      Order: ${order.orderNumber}
      Customer: ${order.customerName}
      Address: ${order.shippingAddress}
      
      Return To:
      [Seller Address]
      
      Instructions:
      1. Pack items securely
      2. Attach this label clearly
      3. Drop at nearest shipping point
    `;
    
    // Create a Blob and download
    const blob = new Blob([labelContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `return-label-${order.orderNumber}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const printReturnLabel = (order) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Return Label - ${order.orderNumber}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .label { border: 2px solid #000; padding: 20px; max-width: 400px; margin: 0 auto; }
            .header { text-align: center; font-size: 18px; font-weight: bold; margin-bottom: 20px; }
            .section { margin-bottom: 15px; }
            .instructions { margin-top: 20px; padding-top: 10px; border-top: 1px solid #ccc; }
            .barcode { text-align: center; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="label">
            <div class="header">Return Shipping Label</div>
            <div class="section">
              <strong>Order:</strong> ${order.orderNumber}<br>
              <strong>Date:</strong> ${new Date().toLocaleDateString()}
            </div>
            <div class="section">
              <strong>Return To:</strong><br>
              [Seller Name]<br>
              [Seller Address]<br>
              [City, State, ZIP]
            </div>
            <div class="section">
              <strong>From:</strong><br>
              ${order.customerName}<br>
              ${order.shippingAddress}
            </div>
            <div class="barcode">
              [Barcode Placeholder]<br>
              ${order.orderNumber}
            </div>
            <div class="instructions">
              <strong>Return Instructions:</strong>
              <ol>
                <li>Pack items securely in original packaging if possible</li>
                <li>Include all original items and accessories</li>
                <li>Attach this label clearly on the outside of the package</li>
                <li>Drop off at any authorized shipping location</li>
              </ol>
            </div>
          </div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-[#0F1111] mb-2">Return Labels</h2>
        <p className="text-[#565959]">Generate and print return labels for your orders</p>
      </div>

      {/* Search */}
      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-[#565959]" />
        </div>
        <input
          type="text"
          placeholder="Search by order number or customer name"
          className="pl-10 w-full p-2 border border-[#D5D9D9] rounded focus:border-[#FF9900] focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map(order => (
          <div key={order.orderNumber} className="border border-[#D5D9D9] rounded p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-medium text-[#0F1111]">Order #{order.orderNumber}</h3>
                <p className="text-sm text-[#565959]">{order.customerName}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => printReturnLabel(order)}
                  className="flex items-center gap-1 px-3 py-1 bg-[#232F3E] text-white rounded hover:bg-[#374151] transition-colors"
                >
                  <Printer className="h-4 w-4" />
                  Print
                </button>
                <button
                  onClick={() => generateReturnLabel(order)}
                  className="flex items-center gap-1 px-3 py-1 bg-[#FF9900] text-white rounded hover:bg-[#FF9900]/90 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Download
                </button>
              </div>
            </div>
            <p className="text-sm text-[#565959]">{order.shippingAddress}</p>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-8 text-[#565959]">
          No orders found matching your search
        </div>
      )}
    </div>
  );
};

export default ReturnLabels;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Upload, Check, Info, X, ChevronRight, AlertCircle } from 'lucide-react';

const requiredDocuments = [
  {
    id: 'bill-of-lading',
    name: 'Bill of Lading',
    description: 'Transport document issued by the carrier to the shipper',
    deadline: '2024-02-01',
    required: true
  },
  {
    id: 'commercial-invoice',
    name: 'Commercial Invoice',
    description: 'Document that states the selling price and quantity of goods',
    deadline: '2024-02-01',
    required: true
  },
  {
    id: 'packing-list',
    name: 'Packing List',
    description: 'Detailed list of items in the shipment',
    deadline: '2024-02-01',
    required: true
  },
  {
    id: 'certificate-origin',
    name: 'Certificate of Origin',
    description: 'Document certifying where goods were manufactured',
    deadline: '2024-02-01',
    required: true
  },
  {
    id: 'shipping-bill',
    name: 'Shipping Bill',
    description: 'Export declaration filed with customs',
    deadline: '2024-02-01',
    required: true
  },
  {
    id: 'insurance',
    name: 'Insurance Certificate',
    description: 'Document proving insurance coverage for the shipment',
    deadline: '2024-02-01',
    required: false
  }
];

const DocumentStatus = {
  PENDING: 'pending',
  SUBMITTED: 'submitted',
  REJECTED: 'rejected',
  VERIFIED: 'verified'
};

const StatusBadge = ({ status }) => {
  const styles = {
    [DocumentStatus.PENDING]: 'bg-gray-100 text-gray-800',
    [DocumentStatus.SUBMITTED]: 'bg-blue-100 text-blue-800',
    [DocumentStatus.REJECTED]: 'bg-red-100 text-red-800',
    [DocumentStatus.VERIFIED]: 'bg-green-100 text-green-800'
  };

  const labels = {
    [DocumentStatus.PENDING]: 'Pending',
    [DocumentStatus.SUBMITTED]: 'Submitted',
    [DocumentStatus.REJECTED]: 'Rejected',
    [DocumentStatus.VERIFIED]: 'Verified'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};

const Documents = () => {
  const [documentStatuses, setDocumentStatuses] = useState({
    'bill-of-lading': DocumentStatus.VERIFIED,
    'commercial-invoice': DocumentStatus.SUBMITTED,
    'packing-list': DocumentStatus.PENDING,
    'certificate-origin': DocumentStatus.REJECTED,
    'shipping-bill': DocumentStatus.PENDING,
    'insurance': DocumentStatus.PENDING
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case DocumentStatus.VERIFIED:
        return <Check className="h-5 w-5 text-green-500" />;
      case DocumentStatus.SUBMITTED:
        return <Info className="h-5 w-5 text-blue-500" />;
      case DocumentStatus.REJECTED:
        return <X className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const completedCount = Object.values(documentStatuses).filter(
    status => status === DocumentStatus.VERIFIED || status === DocumentStatus.SUBMITTED
  ).length;

  return (
    <div className="min-h-screen bg-[#EAEDED] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white shadow rounded-lg mb-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-medium text-[#0F1111]">Export Documents</h1>
              <p className="mt-1 text-sm text-[#565959]">
                Track and manage your export documentation
              </p>
            </div>
            <Link
              to="/documents/upload"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF9900] hover:bg-[#FA8900] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF9900]"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Document
            </Link>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm text-[#565959] mb-2">
              <span>Document Completion</span>
              <span>{completedCount} of {requiredDocuments.length} Required Documents</span>
            </div>
            <div className="w-full bg-[#E6E6E6] rounded-full h-2">
              <div 
                className="bg-[#FF9900] h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completedCount / requiredDocuments.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Document List */}
        <div className="bg-white shadow rounded-lg divide-y divide-[#E6E6E6]">
          {requiredDocuments.map((doc) => (
            <div key={doc.id} className="p-6 hover:bg-[#F7FAFA] transition-colors duration-150">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {getStatusIcon(documentStatuses[doc.id])}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm font-medium text-[#0F1111]">{doc.name}</h3>
                      {doc.required && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#F1F8FF] text-[#0066C0]">
                          Required
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-[#565959]">{doc.description}</p>
                    <div className="mt-2 flex items-center space-x-4">
                      <StatusBadge status={documentStatuses[doc.id]} />
                      <span className="text-xs text-[#565959]">
                        Due by {new Date(doc.deadline).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Link
                    to={`/documents/upload?type=${doc.id}`}
                    className="inline-flex items-center px-3 py-1.5 border border-[#D5D9D9] shadow-sm text-sm font-medium rounded-md text-[#0F1111] bg-white hover:bg-[#F7FAFA] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF9900]"
                  >
                    <Upload className="h-4 w-4 mr-1" />
                    Upload
                  </Link>
                  <button className="p-2 text-[#565959] hover:text-[#232F3E]">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Documents;
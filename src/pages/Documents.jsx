import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, Upload, Check, Info, X, ChevronRight, AlertCircle,
  Download, Search, Filter
} from 'lucide-react';

const documentTemplates = [
  {
    id: 'commercial-invoice',
    name: 'Commercial Invoice Template',
    description: 'Standard template for commercial transactions',
    type: 'invoice',
    downloadUrl: '/templates/commercial-invoice.pdf'
  },
  {
    id: 'bill-of-lading',
    name: 'Bill of Lading Template',
    description: 'Transport document template for carriers',
    type: 'shipping',
    downloadUrl: '/templates/bill-of-lading.pdf'
  },
  {
    id: 'packing-list',
    name: 'Packing List Template',
    description: 'Detailed shipment contents template',
    type: 'packing',
    downloadUrl: '/templates/packing-list.pdf'
  },
  {
    id: 'certificate-origin',
    name: 'Certificate of Origin Template',
    description: 'Product origin declaration template',
    type: 'certificate',
    downloadUrl: '/templates/certificate-origin.pdf'
  },
  {
    id: 'shipping-bill',
    name: 'Shipping Bill Template',
    description: 'Export declaration template for customs',
    type: 'customs',
    downloadUrl: '/templates/shipping-bill.pdf'
  },
  {
    id: 'insurance',
    name: 'Insurance Certificate Template',
    description: 'Insurance coverage documentation template',
    type: 'insurance',
    downloadUrl: '/templates/insurance.pdf'
  }
];

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
  const [activeTab, setActiveTab] = useState('documents');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');

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

  const filteredTemplates = documentTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || template.type === selectedType;
    return matchesSearch && matchesType;
  });

  const completedCount = Object.values(documentStatuses).filter(
    status => status === DocumentStatus.VERIFIED || status === DocumentStatus.SUBMITTED
  ).length;

  return (
    <div className="min-h-screen bg-[#EAEDED] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white shadow rounded-lg mb-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-medium text-[#0F1111]">Document Management</h1>
              <p className="mt-1 text-sm text-[#565959]">
                Manage your export documentation and templates
              </p>
            </div>
            <Link
              to="/documents/upload"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF9900] hover:bg-[#FA8900]"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Document
            </Link>
          </div>

          {/* Tabs */}
          <div className="mt-6 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('documents')}
                className={`${
                  activeTab === 'documents'
                    ? 'border-[#FF9900] text-[#FF9900]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
              >
                Required Documents
              </button>
              <button
                onClick={() => setActiveTab('templates')}
                className={`${
                  activeTab === 'templates'
                    ? 'border-[#FF9900] text-[#FF9900]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
              >
                Document Templates
              </button>
            </nav>
          </div>

          {activeTab === 'documents' && (
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
          )}

          {activeTab === 'templates' && (
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search templates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-64"
                  />
                </div>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="pl-3 pr-10 py-2 border border-gray-300 rounded-md"
                >
                  <option value="all">All Types</option>
                  <option value="invoice">Invoices</option>
                  <option value="shipping">Shipping</option>
                  <option value="packing">Packing Lists</option>
                  <option value="certificate">Certificates</option>
                  <option value="customs">Customs</option>
                  <option value="insurance">Insurance</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        {activeTab === 'documents' ? (
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
                        <Link 
                          to={`/documents/${doc.id}`}
                          className="text-sm font-medium text-[#0F1111] hover:text-[#0066C0]"
                        >
                          {doc.name}
                        </Link>
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
                      className="inline-flex items-center px-3 py-1.5 border border-[#D5D9D9] shadow-sm text-sm font-medium rounded-md text-[#0F1111] bg-white hover:bg-[#F7FAFA]"
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-[#0F1111]">{template.name}</h3>
                    <p className="mt-1 text-sm text-[#565959]">{template.description}</p>
                    <div className="mt-4 flex items-center space-x-4">
                      <span className="text-xs text-[#565959] capitalize">{template.type}</span>
                      <a
                        href={template.downloadUrl}
                        className="inline-flex items-center text-sm text-[#0066C0] hover:text-[#004B8C]"
                        download
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download Template
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Documents;
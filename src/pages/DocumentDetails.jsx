import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  FileText, 
  Download, 
  History, 
  Upload, 
  Archive,
  FileSignature,
  Calendar,
  Clock,
  AlertCircle
} from 'lucide-react';

const DocumentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('details');

  // Mock document data - in a real app, this would come from an API
  const document = {
    id,
    name: 'Commercial Invoice #INV-2024-001',
    type: 'invoice',
    status: 'pending',
    description: 'Commercial invoice for shipment #SHP-2024-001',
    dateCreated: '2024-01-15',
    lastModified: '2024-01-15',
    deadline: '2024-02-01',
    size: '245 KB',
    versions: [
      { 
        id: 'v1', 
        version: '1.0', 
        date: '2024-01-15', 
        modifiedBy: 'John Doe',
        status: 'current',
        size: '245 KB'
      },
      { 
        id: 'v2', 
        version: '0.9', 
        date: '2024-01-14', 
        modifiedBy: 'John Doe',
        status: 'archived',
        size: '242 KB'
      }
    ],
    history: [
      {
        date: '2024-01-15 14:30',
        action: 'Document uploaded',
        user: 'John Doe'
      },
      {
        date: '2024-01-15 14:35',
        action: 'Document submitted for review',
        user: 'John Doe'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#EAEDED] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/documents')}
            className="inline-flex items-center text-[#0066C0] hover:text-[#004B8C] mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Documents
          </button>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-medium text-[#0F1111]">{document.name}</h1>
              <p className="mt-1 text-sm text-[#565959]">{document.description}</p>
            </div>
            <div className="flex space-x-3">
              <button className="inline-flex items-center px-4 py-2 border border-[#D5D9D9] rounded-md shadow-sm text-sm font-medium text-[#0F1111] bg-white hover:bg-[#F7FAFA]">
                <FileSignature className="h-4 w-4 mr-2" />
                Sign Document
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF9900] hover:bg-[#FA8900]">
                <Upload className="h-4 w-4 mr-2" />
                Upload New Version
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="col-span-2 space-y-6">
            {/* Document Preview */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center">
                <FileText className="h-24 w-24 text-gray-400" />
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white shadow rounded-lg">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`${
                      activeTab === 'details'
                        ? 'border-[#FF9900] text-[#FF9900]'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
                  >
                    Details
                  </button>
                  <button
                    onClick={() => setActiveTab('versions')}
                    className={`${
                      activeTab === 'versions'
                        ? 'border-[#FF9900] text-[#FF9900]'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
                  >
                    Versions
                  </button>
                  <button
                    onClick={() => setActiveTab('history')}
                    className={`${
                      activeTab === 'history'
                        ? 'border-[#FF9900] text-[#FF9900]'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
                  >
                    History
                  </button>
                </nav>
              </div>
              <div className="p-6">
                {activeTab === 'details' && (
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Document Type</h3>
                      <p className="mt-1 text-sm text-gray-900 capitalize">{document.type}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Status</h3>
                      <p className="mt-1 text-sm text-gray-900 capitalize">{document.status}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Created Date</h3>
                      <p className="mt-1 text-sm text-gray-900">{document.dateCreated}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Last Modified</h3>
                      <p className="mt-1 text-sm text-gray-900">{document.lastModified}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">File Size</h3>
                      <p className="mt-1 text-sm text-gray-900">{document.size}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Deadline</h3>
                      <p className="mt-1 text-sm text-gray-900">{document.deadline}</p>
                    </div>
                  </div>
                )}
                {activeTab === 'versions' && (
                  <div className="space-y-4">
                    {document.versions.map((version) => (
                      <div 
                        key={version.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <Archive className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              Version {version.version}
                              {version.status === 'current' && (
                                <span className="ml-2 text-xs text-green-600">Current</span>
                              )}
                            </p>
                            <p className="text-xs text-gray-500">
                              Modified by {version.modifiedBy} on {version.date}
                            </p>
                          </div>
                        </div>
                        <button className="text-[#0066C0] hover:text-[#004B8C]">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === 'history' && (
                  <div className="space-y-4">
                    {document.history.map((event, index) => (
                      <div 
                        key={index}
                        className="flex items-start space-x-4 p-4 border rounded-lg"
                      >
                        <History className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{event.action}</p>
                          <p className="text-xs text-gray-500">
                            {event.user} - {event.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Card */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-[#0F1111] mb-4">Document Status</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    Due Date
                  </div>
                  <span className="text-sm font-medium text-gray-900">{document.deadline}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-2" />
                    Last Updated
                  </div>
                  <span className="text-sm font-medium text-gray-900">{document.lastModified}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Status
                  </div>
                  <span className="text-sm font-medium text-gray-900 capitalize">{document.status}</span>
                </div>
              </div>
            </div>

            {/* Actions Card */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-[#0F1111] mb-4">Actions</h2>
              <div className="space-y-3">
                <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-[#D5D9D9] rounded-md shadow-sm text-sm font-medium text-[#0F1111] bg-white hover:bg-[#F7FAFA]">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </button>
                <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-[#D5D9D9] rounded-md shadow-sm text-sm font-medium text-[#0F1111] bg-white hover:bg-[#F7FAFA]">
                  <History className="h-4 w-4 mr-2" />
                  View History
                </button>
                <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-[#D5D9D9] rounded-md shadow-sm text-sm font-medium text-[#0F1111] bg-white hover:bg-[#F7FAFA]">
                  <Archive className="h-4 w-4 mr-2" />
                  Archive
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentDetails;

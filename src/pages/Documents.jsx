import React, { useState } from 'react';
import { FileText, Upload, FolderPlus, File, Check, Info } from 'lucide-react';

const CustomAlert = ({ children }) => (
  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-md flex items-start gap-3">
    <Info className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
    <div className="text-sm text-blue-700">
      {children}
    </div>
  </div>
);

const Documents = () => {
  const [selectedDocument, setSelectedDocument] = useState('bill-of-lading');
  const [submittedDocs, setSubmittedDocs] = useState({
    'bill-of-lading': false,
    'shipping-bill': false,
    'certificate': false,
    'invoice': true,
    'packing': false,
  });

  const documents = [
    { id: 'bill-of-lading', name: 'Straight Bill of Lading', icon: FileText },
    { id: 'shipping-bill', name: 'Shipping Bill', icon: FileText },
    { id: 'certificate', name: 'Certificate of Origin', icon: FileText },
    { id: 'invoice', name: 'Invoice', icon: FileText },
    { id: 'packing', name: 'Packing List', icon: FileText },
  ];

  const toggleSubmitted = (docId) => {
    setSubmittedDocs(prev => ({
      ...prev,
      [docId]: !prev[docId]
    }));
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-full lg:w-64 bg-gradient-to-r lg:bg-gradient-to-b from-orange-500 to-orange-400 text-white">
        <div className="p-6">
          <div className="flex justify-between items-center lg:block mb-6">
            <h2 className="text-2xl font-bold">Documents</h2>
            <div className="lg:mt-4 text-sm">
              <span className="bg-white bg-opacity-20 rounded-full px-3 py-1">
                {Object.values(submittedDocs).filter(Boolean).length} / {documents.length} Submitted
              </span>
            </div>
          </div>
          
          <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0">
            {documents.map((doc) => (
              <button
                key={doc.id}
                onClick={() => setSelectedDocument(doc.id)}
                className={`group flex-shrink-0 lg:flex-shrink text-left px-4 py-3 rounded-lg 
                  transition-all duration-200 flex items-center justify-between
                  ${selectedDocument === doc.id 
                    ? 'bg-navy-900 bg-opacity-20' 
                    : 'hover:bg-white hover:bg-opacity-10'
                  }`}
              >
                <div className="flex items-center min-w-max">
                  <doc.icon className="h-5 w-5 mr-3" />
                  <span>{doc.name}</span>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSubmitted(doc.id);
                  }}
                  className={`ml-3 p-1 rounded-md transition-colors
                    ${submittedDocs[doc.id] 
                      ? 'bg-green-500 text-white' 
                      : 'bg-white bg-opacity-20 hover:bg-opacity-30'
                    }`}
                >
                  <Check className="h-4 w-4" />
                </button>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 lg:p-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {documents.find(d => d.id === selectedDocument)?.name}
              </h1>
              <p className="text-gray-500">Document preview</p>
            </div>
            <div className="flex gap-3 w-full lg:w-auto">
              <button className="flex-1 lg:flex-initial inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </button>
              <button className="flex-1 lg:flex-initial inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 transition-colors">
                <FolderPlus className="h-4 w-4 mr-2" />
                New Folder
              </button>
            </div>
          </div>

          {!submittedDocs[selectedDocument] && (
            <CustomAlert>
              This document hasn't been submitted yet. Upload the document and mark it as submitted when ready.
            </CustomAlert>
          )}

          {/* Document Preview */}
          <div className="bg-white rounded-2xl shadow-lg p-4 lg:p-8 max-w-4xl mx-auto">
            {selectedDocument === 'bill-of-lading' && (
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h2 className="text-xl font-bold mb-4">Straight Bill of Lading</h2>
                  
                  {/* Form Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">SHIP TO</label>
                        <input 
                          type="text" 
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Company Name"
                        />
                      </div>
                      <div>
                        <input 
                          type="text" 
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Street"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">FROM</label>
                        <input 
                          type="text" 
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Shipping Name"
                        />
                      </div>
                      <div>
                        <input 
                          type="text" 
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Address"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. Shipping Units</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kind of Package</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Charges</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[...Array(5)].map((_, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input 
                              type="text"
                              className="w-full border-0 bg-transparent focus:ring-0"
                              placeholder="Enter units"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input 
                              type="text"
                              className="w-full border-0 bg-transparent focus:ring-0"
                              placeholder="Enter package type"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input 
                              type="text"
                              className="w-full border-0 bg-transparent focus:ring-0"
                              placeholder="Enter weight"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input 
                              type="text"
                              className="w-full border-0 bg-transparent focus:ring-0"
                              placeholder="Enter charges"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;
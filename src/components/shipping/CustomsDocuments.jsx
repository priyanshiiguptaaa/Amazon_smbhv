import React, { useState, useEffect } from 'react';
import { FileText, Download, Upload, AlertTriangle, Check, X } from 'lucide-react';

const CustomsDocuments = ({ shipmentId }) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);

  useEffect(() => {
    fetchCustomsDocuments();
  }, [shipmentId]);

  const fetchCustomsDocuments = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/shipments/${shipmentId}/customs-documents`);
      const data = await response.json();
      setDocuments(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch customs documents');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('document', file);

    setUploadStatus('uploading');
    try {
      // TODO: Replace with actual API call
      await fetch(`/api/shipments/${shipmentId}/customs-documents`, {
        method: 'POST',
        body: formData
      });
      setUploadStatus('success');
      fetchCustomsDocuments();
    } catch (err) {
      setUploadStatus('error');
      setError('Failed to upload document');
    }
  };

  const handleDownload = async (documentId) => {
    try {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/shipments/${shipmentId}/customs-documents/${documentId}/download`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `customs-document-${documentId}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError('Failed to download document');
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
      {/* Upload Section */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Upload Customs Documents</h3>
        <div className="flex items-center space-x-4">
          <label className="relative cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-md transition-colors">
            <span className="flex items-center space-x-2">
              <Upload className="h-5 w-5" />
              <span>Choose File</span>
            </span>
            <input
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
            />
          </label>
          {uploadStatus && (
            <div className="flex items-center space-x-2">
              {uploadStatus === 'uploading' && (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
              )}
              {uploadStatus === 'success' && (
                <Check className="h-5 w-5 text-green-500" />
              )}
              {uploadStatus === 'error' && (
                <X className="h-5 w-5 text-red-500" />
              )}
              <span className={`text-sm ${
                uploadStatus === 'success' ? 'text-green-600' :
                uploadStatus === 'error' ? 'text-red-600' :
                'text-blue-600'
              }`}>
                {uploadStatus === 'uploading' ? 'Uploading...' :
                 uploadStatus === 'success' ? 'Upload successful' :
                 'Upload failed'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Documents List */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-medium text-gray-900">Documents</h3>
        </div>
        {error ? (
          <div className="p-6">
            <div className="flex items-center space-x-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              <span>{error}</span>
            </div>
          </div>
        ) : documents.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <FileText className="h-12 w-12 mx-auto mb-3 text-gray-400" />
            <p>No customs documents uploaded yet</p>
          </div>
        ) : (
          <ul className="divide-y">
            {documents.map((doc) => (
              <li key={doc.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-6 w-6 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">{doc.name}</p>
                      <p className="text-sm text-gray-500">
                        Uploaded on {new Date(doc.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownload(doc.id)}
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CustomsDocuments;

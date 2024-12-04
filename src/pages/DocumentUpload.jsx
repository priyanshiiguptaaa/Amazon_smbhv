import React, { useState, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { FileText, Upload, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { encryptFile } from '../utils/encryption';
import { logActivity, ACTIVITY_TYPES } from '../utils/logger';

const documentTemplates = [
  {
    id: 'commercial-invoice',
    name: 'Commercial Invoice Template',
    description: 'Standard template for commercial transactions',
    type: 'invoice',
    downloadUrl: '#'
  },
  {
    id: 'bill-of-lading',
    name: 'Bill of Lading Template',
    description: 'Transport document template for carriers',
    type: 'shipping',
    downloadUrl: '#'
  },
  {
    id: 'packing-list',
    name: 'Packing List Template',
    description: 'Detailed shipment contents template',
    type: 'packing',
    downloadUrl: '#'
  },
  {
    id: 'certificate-origin',
    name: 'Certificate of Origin Template',
    description: 'Product origin declaration template',
    type: 'certificate',
    downloadUrl: '#'
  },
  {
    id: 'shipping-bill',
    name: 'Shipping Bill Template',
    description: 'Export declaration template for customs',
    type: 'customs',
    downloadUrl: '#'
  },
  {
    id: 'insurance',
    name: 'Insurance Certificate Template',
    description: 'Insurance coverage documentation template',
    type: 'insurance',
    downloadUrl: '#'
  }
];

const DocumentUpload = () => {
  const [searchParams] = useSearchParams();
  const documentType = searchParams.get('type');
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    const newFiles = await Promise.all(acceptedFiles.map(async (file) => {
      // Encrypt file data before storing
      const encryptedData = await encryptFile(file);
      return {
        file,
        encryptedData,
        preview: URL.createObjectURL(file)
      };
    }));
    setFiles(newFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1
  });

  const handleRemoveFile = (index) => {
    setFiles(files => files.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    try {
      // Mock API call - replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await logActivity(
        ACTIVITY_TYPES.DOCUMENT_UPLOAD,
        'Document uploaded successfully',
        { documentType, userId: user?.id }
      );

      navigate('/documents');
    } catch (error) {
      console.error('Upload error:', error);
      await logActivity(
        ACTIVITY_TYPES.DOCUMENT_UPLOAD,
        'Document upload failed',
        { documentType, userId: user?.id, error: error.message },
        'error'
      );
    } finally {
      setUploading(false);
    }
  };

  const selectedTemplate = documentTemplates.find(template => template.id === documentType);

  return (
    <div className="min-h-screen bg-[#EAEDED] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/documents')}
            className="inline-flex items-center text-[#0066C0] hover:text-[#004B8C] mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Documents
          </button>
          <h1 className="text-2xl font-medium text-[#0F1111]">Upload Document</h1>
          {selectedTemplate && (
            <p className="mt-1 text-sm text-[#565959]">
              Uploading: {selectedTemplate.name}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Upload Area */}
          <div className="md:col-span-2">
            <div className="bg-white shadow rounded-lg p-6">
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
                  ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
              >
                <input {...getInputProps()} />
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600">
                  {isDragActive
                    ? 'Drop the file here'
                    : 'Drag and drop a PDF file here, or click to select'}
                </p>
              </div>

              {files.length > 0 && (
                <div className="mt-6">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
                    >
                      <div className="flex items-center">
                        <FileText className="h-6 w-6 text-blue-500 mr-3" />
                        <span className="text-gray-700">{file.file.name}</span>
                      </div>
                      <button
                        onClick={() => handleRemoveFile(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={handleUpload}
                disabled={files.length === 0 || uploading}
                className={`flex items-center justify-center w-full py-2 px-4 rounded-lg
                  ${files.length === 0 || uploading
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600'} text-white`}
              >
                {uploading ? (
                  <span>Uploading...</span>
                ) : (
                  <>
                    <Upload className="h-5 w-5 mr-2" />
                    <span>Upload Document</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Templates */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-[#0F1111] mb-4">Document Templates</h2>
            <div className="space-y-4">
              {documentTemplates.map((template) => (
                <div
                  key={template.id}
                  className={`p-4 rounded-lg border ${
                    template.id === documentType
                      ? 'border-[#FF9900] bg-[#FFF8F0]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h3 className="text-sm font-medium text-[#0F1111]">{template.name}</h3>
                  <p className="mt-1 text-xs text-[#565959]">{template.description}</p>
                  <a
                    href={template.downloadUrl}
                    className="mt-2 inline-flex items-center text-xs text-[#0066C0] hover:text-[#004B8C]"
                  >
                    <FileText className="h-3 w-3 mr-1" />
                    Download Template
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;

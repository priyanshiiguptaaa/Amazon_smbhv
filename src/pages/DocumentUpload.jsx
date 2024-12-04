import React, { useState, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { FileText, Upload, X } from 'lucide-react';

const DocumentUpload = () => {
  const [searchParams] = useSearchParams();
  const documentType = searchParams.get('type');
  const navigate = useNavigate();
  
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file)
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
      navigate('/documents');
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EAEDED] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-medium text-[#0F1111]">Upload Document</h1>
              <p className="mt-1 text-sm text-[#565959]">
                Upload your export-related documents
              </p>
            </div>
          </div>

          <div className="mt-4">
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center ${
                isDragActive ? 'border-[#FF9900] bg-[#FFF8E7]' : 'border-gray-300'
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                Drag & drop your document here, or click to select
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Supported formats: PDF
              </p>
            </div>

            {files.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900">Selected document</h4>
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="mt-2 flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <span className="ml-2 text-sm text-gray-900">
                        {file.file.name}
                      </span>
                    </div>
                    <button
                      onClick={() => handleRemoveFile(index)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}

                <div className="mt-4">
                  <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF9900] hover:bg-[#FA8900] disabled:opacity-50"
                  >
                    {uploading ? (
                      <>
                        <span className="mr-2">Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Document
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;

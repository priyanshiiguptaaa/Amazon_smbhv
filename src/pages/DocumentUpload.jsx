import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Upload, ArrowLeft, X } from 'lucide-react';

const DocumentUpload = () => {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (newFiles) => {
    setFiles(prev => [...prev, ...Array.from(newFiles)]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-[#EAEDED] py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/documents"
            className="inline-flex items-center text-sm text-[#0066C0] hover:text-[#C7511F] hover:underline"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Documents
          </Link>
          <h1 className="mt-4 text-2xl font-medium text-[#0F1111]">Upload Documents</h1>
          <p className="mt-1 text-sm text-[#565959]">
            Upload your documents by dragging and dropping files or clicking to browse
          </p>
        </div>

        {/* Upload Area */}
        <div 
          className={`relative border-2 border-dashed rounded-lg p-8 text-center bg-white
            ${dragActive ? 'border-[#FF9900] bg-[#FEF8F2]' : 'border-[#D5D9D9] hover:border-[#FF9900]'}
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="space-y-4">
            <div className="mx-auto h-12 w-12 text-[#565959]">
              <Upload className="h-12 w-12" />
            </div>
            <div className="flex text-sm text-[#0F1111]">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md font-medium text-[#0066C0] hover:text-[#C7511F] hover:underline focus-within:outline-none focus-within:ring-2 focus-within:ring-[#FF9900] focus-within:ring-offset-2"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  multiple
                  onChange={handleChange}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-[#565959]">PDF, DOC, DOCX, XLS, XLSX up to 10MB</p>
          </div>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-[#0F1111]">Selected files</h3>
            <div className="mt-2 divide-y divide-[#E6E6E6] rounded-lg border border-[#D5D9D9] bg-white">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between py-3 px-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-[#F7F8FA] flex items-center justify-center">
                      <Upload className="h-5 w-5 text-[#565959]" />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="text-sm font-medium text-[#0F1111]">{file.name}</div>
                      <div className="text-xs text-[#565959]">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="ml-4 flex-shrink-0 p-1 text-[#565959] hover:text-[#232F3E]"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end space-x-3">
          <Link
            to="/documents"
            className="inline-flex items-center px-4 py-2 border border-[#D5D9D9] shadow-sm text-sm font-medium rounded-md text-[#0F1111] bg-white hover:bg-[#F7FAFA] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF9900]"
          >
            Cancel
          </Link>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#FF9900] hover:bg-[#FA8900] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF9900]"
          >
            Upload {files.length > 0 ? `(${files.length})` : ''}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;

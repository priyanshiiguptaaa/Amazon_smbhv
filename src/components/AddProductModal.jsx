import React, { useState } from 'react';
import { X } from 'lucide-react';

const AddProductModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    manufacturer: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock, 10)
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#0F1111]">Add New Product</h2>
          <button
            onClick={onClose}
            className="text-[#565959] hover:text-[#0F1111]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#0F1111] mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-[#D5D9D9] rounded-md focus:outline-none focus:ring-1 focus:ring-[#FF9900] focus:border-[#FF9900]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0F1111] mb-1">
              SKU
            </label>
            <input
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-[#D5D9D9] rounded-md focus:outline-none focus:ring-1 focus:ring-[#FF9900] focus:border-[#FF9900]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0F1111] mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-[#D5D9D9] rounded-md focus:outline-none focus:ring-1 focus:ring-[#FF9900] focus:border-[#FF9900]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#0F1111] mb-1">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-[#D5D9D9] rounded-md focus:outline-none focus:ring-1 focus:ring-[#FF9900] focus:border-[#FF9900]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0F1111] mb-1">
                Stock
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-3 py-2 border border-[#D5D9D9] rounded-md focus:outline-none focus:ring-1 focus:ring-[#FF9900] focus:border-[#FF9900]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0F1111] mb-1">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#D5D9D9] rounded-md focus:outline-none focus:ring-1 focus:ring-[#FF9900] focus:border-[#FF9900]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0F1111] mb-1">
              Manufacturer
            </label>
            <input
              type="text"
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#D5D9D9] rounded-md focus:outline-none focus:ring-1 focus:ring-[#FF9900] focus:border-[#FF9900]"
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#D5D9D9] rounded-md text-[#0F1111] hover:bg-[#F7F8F8]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:bg-[#FA8900] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF9900]"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;

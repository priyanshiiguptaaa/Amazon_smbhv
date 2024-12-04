import React, { useState, useRef } from 'react';
import { useInventory } from '../contexts/InventoryContext';
import { Search, Plus, Package, ArrowUpDown, Upload, Download, AlertTriangle, Edit, Trash } from 'lucide-react';
import AddProductModal from '../components/AddProductModal';
import SuggestedPackaging from '../components/SuggestedPackaging';
import { importProducts, exportProducts, convertUnit } from '../api/inventory';

const Inventory = () => {
  const { inventory = [], loading, error, addProduct, updateProduct, deleteProduct } = useInventory();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState('kg');
  const fileInputRef = useRef(null);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleAddProduct = async (productData) => {
    try {
      await addProduct(productData);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleEditProduct = async (productData) => {
    try {
      await updateProduct(selectedProduct.id, productData);
      setIsEditModalOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId);
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        await importProducts(file);
        // Refresh inventory after import
        window.location.reload();
      } catch (error) {
        console.error('Error importing products:', error);
      }
    }
  };

  const handleExport = async () => {
    try {
      await exportProducts();
    } catch (error) {
      console.error('Error exporting products:', error);
    }
  };

  const filteredInventory = Array.isArray(inventory) ? inventory
    .filter(item => 
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      const direction = sortDirection === 'asc' ? 1 : -1;
      if (sortField === 'name') {
        return direction * (a.name || '').localeCompare(b.name || '');
      }
      return direction * ((a[sortField] || 0) - (b[sortField] || 0));
    }) : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#EAEDED] py-8 flex items-center justify-center">
        <div className="text-lg text-[#0F1111]">Loading inventory...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#EAEDED] py-8 flex items-center justify-center">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EAEDED] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white shadow rounded-lg mb-6 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-medium text-[#0F1111]">Inventory</h1>
              <p className="mt-1 text-sm text-[#565959]">
                Manage your product inventory and stock levels
              </p>
            </div>
            <div className="flex space-x-4">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".csv,.xlsx"
                onChange={handleImport}
              />
              <button
                onClick={() => fileInputRef.current.click()}
                className="inline-flex items-center px-4 py-2 border border-[#D5D9D9] rounded-md shadow-sm text-sm font-medium text-[#0F1111] bg-white hover:bg-[#F7FAFA] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF9900]"
              >
                <Upload className="h-4 w-4 mr-2" />
                Import
              </button>
              <button
                onClick={handleExport}
                className="inline-flex items-center px-4 py-2 border border-[#D5D9D9] rounded-md shadow-sm text-sm font-medium text-[#0F1111] bg-white hover:bg-[#F7FAFA] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF9900]"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF9900] hover:bg-[#FA8900] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF9900]"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </button>
            </div>
          </div>

          {/* Search and Unit Selection */}
          <div className="mt-6 flex gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-[#565959]" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-[#D5D9D9] rounded-md leading-5 bg-white placeholder-[#565959] focus:outline-none focus:ring-1 focus:ring-[#FF9900] focus:border-[#FF9900] sm:text-sm"
                placeholder="Search by name, SKU, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
              className="block w-32 pl-3 pr-10 py-2 text-base border border-[#D5D9D9] focus:outline-none focus:ring-[#FF9900] focus:border-[#FF9900] sm:text-sm rounded-md"
            >
              <option value="kg">Kilograms</option>
              <option value="lbs">Pounds</option>
              <option value="oz">Ounces</option>
            </select>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#E6E6E6]">
              <thead className="bg-[#F7FAFA]">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#565959] uppercase tracking-wider">
                    <button
                      className="group inline-flex items-center"
                      onClick={() => handleSort('name')}
                    >
                      Product
                      <ArrowUpDown className="ml-2 h-4 w-4 text-[#565959] group-hover:text-[#232F3E]" />
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#565959] uppercase tracking-wider">
                    SKU & Tags
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#565959] uppercase tracking-wider">
                    <button
                      className="group inline-flex items-center"
                      onClick={() => handleSort('stock')}
                    >
                      Stock
                      <ArrowUpDown className="ml-2 h-4 w-4 text-[#565959] group-hover:text-[#232F3E]" />
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#565959] uppercase tracking-wider">
                    Status & Alerts
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#565959] uppercase tracking-wider">
                    Storage Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#565959] uppercase tracking-wider">
                    Expiry Date
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#E6E6E6]">
                {filteredInventory.map((item) => (
                  <React.Fragment key={item.id}>
                    <tr 
                      onClick={() => setSelectedProduct(item)}
                      className={`hover:bg-[#F7FAFA] cursor-pointer transition-colors ${
                        selectedProduct?.id === item.id ? 'bg-[#F7FAFA]' : ''
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <div className="h-10 w-10 rounded-lg bg-[#F7F8FA] flex items-center justify-center">
                              <Package className="h-5 w-5 text-[#565959]" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-[#0F1111]">{item.name}</div>
                            <div className="text-sm text-[#565959]">{item.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-[#0F1111]">{item.sku}</div>
                        <div className="text-sm text-[#565959]">₹{item.price.toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-[#0F1111]">
                          {item.quantity} {item.unit}
                        </div>
                        <div className={`text-sm ${item.quantity === 0 ? 'text-red-600' : item.quantity <= 10 ? 'text-yellow-600' : 'text-green-600'}`}>
                          {item.quantity === 0 ? 'Out of Stock' : item.quantity <= 10 ? 'Low Stock' : 'In Stock'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-[#0F1111]">{item.supplier}</div>
                        <div className="text-sm text-[#565959]">GST: {item.gst}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-[#0F1111]">{item.location || 'Not Assigned'}</div>
                        {item.zone && (
                          <div className="text-sm text-[#565959]">Zone: {item.zone}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-[#0F1111]">
                          {item.expiryDate ? new Date(item.expiryDate).toLocaleDateString() : 'N/A'}
                        </div>
                        {item.expiryDate && new Date(item.expiryDate) <= new Date() && (
                          <div className="text-sm text-red-600">Expired</div>
                        )}
                        {item.expiryDate && new Date(item.expiryDate) > new Date() && new Date(item.expiryDate) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) && (
                          <div className="text-sm text-yellow-600">Expiring Soon</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openEditModal(item);
                            }}
                            className="text-[#565959] hover:text-[#232F3E]"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteProduct(item.id);
                            }}
                            className="text-[#565959] hover:text-red-600"
                          >
                            <Trash className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {selectedProduct?.id === item.id && (
                      <tr>
                        <td colSpan="7" className="px-6 py-4">
                          <SuggestedPackaging product={selectedProduct} />
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit Product Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-lg w-full">
              <h2 className="text-xl font-medium mb-4">Edit Product</h2>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const data = {
                  name: formData.get('name'),
                  sku: formData.get('sku'),
                  category: formData.get('category'),
                  quantity: parseInt(formData.get('quantity')),
                  unit: formData.get('unit'),
                  price: parseFloat(formData.get('price')),
                  supplier: formData.get('supplier'),
                  gst: formData.get('gst')
                };
                handleEditProduct(data);
              }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={selectedProduct.name}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF9900] focus:ring-[#FF9900]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">SKU</label>
                    <input
                      type="text"
                      name="sku"
                      defaultValue={selectedProduct.sku}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF9900] focus:ring-[#FF9900]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <input
                      type="text"
                      name="category"
                      defaultValue={selectedProduct.category}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF9900] focus:ring-[#FF9900]"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Quantity</label>
                      <input
                        type="number"
                        name="quantity"
                        defaultValue={selectedProduct.quantity}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF9900] focus:ring-[#FF9900]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Unit</label>
                      <input
                        type="text"
                        name="unit"
                        defaultValue={selectedProduct.unit}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF9900] focus:ring-[#FF9900]"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                    <input
                      type="number"
                      name="price"
                      defaultValue={selectedProduct.price}
                      step="0.01"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF9900] focus:ring-[#FF9900]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Supplier</label>
                    <input
                      type="text"
                      name="supplier"
                      defaultValue={selectedProduct.supplier}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF9900] focus:ring-[#FF9900]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">GST Rate</label>
                    <select
                      name="gst"
                      defaultValue={selectedProduct.gst}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF9900] focus:ring-[#FF9900]"
                      required
                    >
                      <option value="5%">5%</option>
                      <option value="12%">12%</option>
                      <option value="18%">18%</option>
                      <option value="28%">28%</option>
                    </select>
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setSelectedProduct(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF9900] hover:bg-[#FA8900]"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <AddProductModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddProduct}
        />
      </div>
    </div>
  );
};

export default Inventory;

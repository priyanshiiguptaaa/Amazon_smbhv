import React, { useState } from 'react';
import { useInventory } from '../contexts/InventoryContext';
import { Search, Filter, Plus, Package, ArrowUpDown } from 'lucide-react';

const Inventory = () => {
  const { inventory } = useInventory();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredInventory = inventory
    .filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const direction = sortDirection === 'asc' ? 1 : -1;
      if (sortField === 'name') {
        return direction * a.name.localeCompare(b.name);
      }
      return direction * (a[sortField] - b[sortField]);
    });

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
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF9900] hover:bg-[#FA8900] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF9900]"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </button>
          </div>

          {/* Search and Filter */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-[#565959]" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-[#D5D9D9] rounded-md leading-5 bg-white placeholder-[#565959] focus:outline-none focus:ring-1 focus:ring-[#FF9900] focus:border-[#FF9900] sm:text-sm"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-[#D5D9D9] rounded-md shadow-sm text-sm font-medium text-[#0F1111] bg-white hover:bg-[#F7FAFA] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF9900]"
            >
              <Filter className="h-4 w-4 mr-2 text-[#565959]" />
              Filters
            </button>
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
                    <button
                      className="group inline-flex items-center"
                      onClick={() => handleSort('sku')}
                    >
                      SKU
                      <ArrowUpDown className="ml-2 h-4 w-4 text-[#565959] group-hover:text-[#232F3E]" />
                    </button>
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
                    Status
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#E6E6E6]">
                {filteredInventory.map((item) => (
                  <tr key={item.sku} className="hover:bg-[#F7FAFA]">
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-[#0F1111]">{item.sku}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-[#0F1111]">{item.stock}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${item.stock > 10 
                          ? 'bg-[#F1F8FF] text-[#0066C0]' 
                          : item.stock > 0 
                            ? 'bg-[#FEF8F2] text-[#C7511F]'
                            : 'bg-[#FEF2F2] text-[#D13212]'
                        }`}
                      >
                        {item.stock > 10 ? 'In Stock' : item.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-[#0066C0] hover:text-[#C7511F] hover:underline">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;

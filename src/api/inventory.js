import axiosWithAuth from '../utils/auth';

// Mock data for Indian SMB inventory
const mockInventory = [
  {
    id: '1',
    name: 'Basmati Rice',
    sku: 'GR001',
    quantity: 500,
    unit: 'kg',
    location: 'Warehouse Delhi',
    category: 'Groceries',
    price: 85.00,
    supplier: 'Punjab Grains Ltd',
    status: 'In Stock',
    gst: '5%'
  },
  {
    id: '2',
    name: 'Cotton Saree',
    sku: 'AP002',
    quantity: 150,
    unit: 'pieces',
    location: 'Warehouse Mumbai',
    category: 'Apparel',
    price: 850.00,
    supplier: 'Surat Textiles',
    status: 'Low Stock',
    gst: '12%'
  },
  {
    id: '3',
    name: 'Stainless Steel Utensils Set',
    sku: 'HW003',
    quantity: 75,
    unit: 'sets',
    location: 'Warehouse Bangalore',
    category: 'Homeware',
    price: 1200.00,
    supplier: 'Steel Crafts India',
    status: 'In Stock',
    gst: '18%'
  },
  {
    id: '4',
    name: 'Masala Spice Mix',
    sku: 'GR004',
    quantity: 300,
    unit: 'kg',
    location: 'Warehouse Chennai',
    category: 'Groceries',
    price: 250.00,
    supplier: 'Kerala Spices Co',
    status: 'In Stock',
    gst: '5%'
  },
  {
    id: '5',
    name: 'LED Bulb Pack',
    sku: 'EL005',
    quantity: 0,
    unit: 'packs',
    location: 'Warehouse Delhi',
    category: 'Electronics',
    price: 299.00,
    supplier: 'Bright Electronics',
    status: 'Out of Stock',
    gst: '18%'
  }
];

// Unit conversion utility
export const convertUnit = async (value, fromUnit, toUnit) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    // Mock conversion logic
    return { value: value * 2, unit: toUnit };
  } catch (error) {
    throw new Error('Failed to convert unit');
  }
};

// Get all inventory items with optional filtering
export const getInventoryItems = async (filters = {}) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredInventory = [...mockInventory];
    
    // Apply filters if any
    if (filters.category) {
      filteredInventory = filteredInventory.filter(item => 
        item.category.toLowerCase() === filters.category.toLowerCase()
      );
    }
    
    if (filters.status) {
      filteredInventory = filteredInventory.filter(item => 
        item.status.toLowerCase() === filters.status.toLowerCase()
      );
    }

    if (filters.location) {
      filteredInventory = filteredInventory.filter(item => 
        item.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.supplier) {
      filteredInventory = filteredInventory.filter(item => 
        item.supplier.toLowerCase().includes(filters.supplier.toLowerCase())
      );
    }
    
    return filteredInventory;
  } catch (error) {
    throw new Error('Failed to fetch inventory items');
  }
};

// Get a single inventory item by ID
export const getInventoryItemById = async (itemId) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    const item = mockInventory.find(item => item.id === itemId);
    if (!item) {
      throw new Error('Inventory item not found');
    }
    return item;
  } catch (error) {
    throw new Error('Failed to fetch inventory item');
  }
};

// Create a new inventory item
export const createInventoryItem = async (itemData) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newItem = {
      id: String(mockInventory.length + 1),
      ...itemData,
      createdAt: new Date().toISOString()
    };
    mockInventory.push(newItem);
    return newItem;
  } catch (error) {
    throw new Error('Failed to create inventory item');
  }
};

// Update an existing inventory item
export const updateInventoryItem = async (itemId, updateData) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockInventory.findIndex(item => item.id === itemId);
    if (index === -1) {
      throw new Error('Inventory item not found');
    }
    
    mockInventory[index] = {
      ...mockInventory[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    
    return mockInventory[index];
  } catch (error) {
    throw new Error('Failed to update inventory item');
  }
};

// Delete an inventory item
export const deleteInventoryItem = async (itemId) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockInventory.findIndex(item => item.id === itemId);
    if (index === -1) {
      throw new Error('Inventory item not found');
    }
    mockInventory.splice(index, 1);
    return { success: true, message: 'Item deleted successfully' };
  } catch (error) {
    throw new Error('Failed to delete inventory item');
  }
};

// Update stock levels
export const updateStockLevel = async (itemId, quantity, operation = 'add') => {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockInventory.findIndex(item => item.id === itemId);
    if (index === -1) {
      throw new Error('Inventory item not found');
    }
    
    if (operation === 'add') {
      mockInventory[index].quantity += quantity;
    } else if (operation === 'subtract') {
      mockInventory[index].quantity = Math.max(0, mockInventory[index].quantity - quantity);
    }
    
    return mockInventory[index];
  } catch (error) {
    throw new Error('Failed to update stock level');
  }
};

// Get inventory statistics
export const getInventoryStats = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      totalItems: mockInventory.length,
      lowStock: mockInventory.filter(item => item.quantity < 10).length,
      outOfStock: mockInventory.filter(item => item.quantity === 0).length,
      categories: [...new Set(mockInventory.map(item => item.category))].length
    };
  } catch (error) {
    throw new Error('Failed to fetch inventory statistics');
  }
};

// Import products from file
export const importProducts = async (file) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Mock import logic
    const newItem = {
      id: String(mockInventory.length + 1),
      name: 'Imported Product',
      sku: `SKU${String(mockInventory.length + 1).padStart(3, '0')}`,
      quantity: 100,
      location: 'Warehouse 1',
      category: 'Imported',
      status: 'In Stock'
    };
    mockInventory.push(newItem);
    return [newItem];
  } catch (error) {
    throw new Error('Failed to import inventory');
  }
};

// Export products to file
export const exportProducts = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockInventory;
  } catch (error) {
    throw new Error('Failed to export inventory');
  }
};

export default {
  convertUnit,
  getInventoryItems,
  getInventoryItemById,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  updateStockLevel,
  getInventoryStats,
  importProducts,
  exportProducts
};

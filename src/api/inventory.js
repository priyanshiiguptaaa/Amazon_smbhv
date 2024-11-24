import api from '../utils/axios';

export const inventoryApi = {
    // Get all inventory items
    getAllItems: async () => {
        try {
            const response = await api.get('/inventory');
            return response.data.inventory;
        } catch (error) {
            console.error('Error fetching inventory:', error);
            throw error;
        }
    },

    // Add a new product
    addProduct: async (productData) => {
        try {
            const response = await api.post('/inventory', productData);
            return response.data.product;
        } catch (error) {
            console.error('Error adding product:', error);
            throw error;
        }
    },

    // Update a product
    updateProduct: async (sku, productData) => {
        try {
            const response = await api.put(`/inventory/${sku}`, productData);
            return response.data.product;
        } catch (error) {
            console.error('Error updating product:', error);
            throw error;
        }
    },

    // Delete a product
    deleteProduct: async (sku) => {
        try {
            const response = await api.delete(`/inventory/${sku}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    }
};

export default inventoryApi;

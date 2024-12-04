import React, { createContext, useContext, useState, useEffect } from 'react';
import { getInventoryItems, createInventoryItem, updateInventoryItem, deleteInventoryItem } from '../api/inventory';

const InventoryContext = createContext();

export const useInventory = () => {
    const context = useContext(InventoryContext);
    if (!context) {
        throw new Error('useInventory must be used within an InventoryProvider');
    }
    return context;
};

export const InventoryProvider = ({ children }) => {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchInventory = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getInventoryItems();
            setInventory(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Error fetching inventory:', err);
            setError('Failed to fetch inventory. Please try again later.');
            setInventory([]);
        } finally {
            setLoading(false);
        }
    };

    const addProduct = async (productData) => {
        try {
            await createInventoryItem(productData);
            await fetchInventory(); // Refresh the list
        } catch (err) {
            console.error('Error adding product:', err);
            throw new Error('Failed to add product. Please try again.');
        }
    };

    const updateProduct = async (productId, productData) => {
        try {
            await updateInventoryItem(productId, productData);
            await fetchInventory(); // Refresh the list
        } catch (err) {
            console.error('Error updating product:', err);
            throw new Error('Failed to update product. Please try again.');
        }
    };

    const deleteProduct = async (productId) => {
        try {
            await deleteInventoryItem(productId);
            await fetchInventory(); // Refresh the list
        } catch (err) {
            console.error('Error deleting product:', err);
            throw new Error('Failed to delete product. Please try again.');
        }
    };

    useEffect(() => {
        fetchInventory();
    }, []);

    return (
        <InventoryContext.Provider
            value={{
                inventory,
                loading,
                error,
                addProduct,
                updateProduct,
                deleteProduct,
                refreshInventory: fetchInventory
            }}
        >
            {children}
        </InventoryContext.Provider>
    );
};

export default InventoryContext;

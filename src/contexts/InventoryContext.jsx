import React, { createContext, useContext, useState, useEffect } from 'react';
import inventoryApi from '../api/inventory';

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
            const data = await inventoryApi.getAllItems();
            setInventory(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching inventory:', err);
            setError('Failed to fetch inventory');
        } finally {
            setLoading(false);
        }
    };

    const addProduct = async (productData) => {
        try {
            const newProduct = await inventoryApi.addProduct(productData);
            setInventory(prev => [...prev, newProduct]);
            return newProduct;
        } catch (err) {
            console.error('Error adding product:', err);
            throw err;
        }
    };

    const updateProduct = async (sku, productData) => {
        try {
            const updatedProduct = await inventoryApi.updateProduct(sku, productData);
            setInventory(prev => 
                prev.map(item => item.sku === sku ? updatedProduct : item)
            );
            return updatedProduct;
        } catch (err) {
            console.error('Error updating product:', err);
            throw err;
        }
    };

    const deleteProduct = async (sku) => {
        try {
            await inventoryApi.deleteProduct(sku);
            setInventory(prev => prev.filter(item => item.sku !== sku));
        } catch (err) {
            console.error('Error deleting product:', err);
            throw err;
        }
    };

    useEffect(() => {
        fetchInventory();
    }, []);

    const value = {
        inventory,
        loading,
        error,
        fetchInventory,
        addProduct,
        updateProduct,
        deleteProduct
    };

    return (
        <InventoryContext.Provider value={value}>
            {children}
        </InventoryContext.Provider>
    );
};

export default InventoryContext;

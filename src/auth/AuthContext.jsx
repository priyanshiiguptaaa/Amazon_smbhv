import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

// Mock user data
const MOCK_USER = {
    id: 1,
    name: 'John Smith',
    email: 'demo@cargoconnect.com',
    company: 'Cargo Connect Ltd.',
    phone: '+1 (555) 123-4567',
    role: 'admin'
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user was previously logged in
        const token = localStorage.getItem('token');
        if (token) {
            setUser(MOCK_USER);
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        // Mock credentials check
        if (email === 'demo@cargoconnect.com' && password === 'demo123') {
            localStorage.setItem('token', 'mock-jwt-token');
            setUser(MOCK_USER);
            navigate('/');
            return { success: true };
        }
        return { 
            success: false, 
            error: 'Invalid credentials. Use demo@cargoconnect.com / demo123'
        };
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-[#EAEDED]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF9900]"></div>
        </div>;
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
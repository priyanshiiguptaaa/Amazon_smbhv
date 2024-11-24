const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mockUsers = require('../data/mockUsers');

// JWT secret key
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Test route
router.get('/test', (req, res) => {
    res.json({ message: 'Auth route is working!' });
});

// Login route
router.post('/login', (req, res) => {
    console.log('Login attempt:', req.body);
    const { email, password } = req.body;

    try {
        // Find user in mock data
        const user = mockUsers.find(u => u.email === email && u.password === password);
        
        if (!user) {
            console.log('Invalid credentials for:', email);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign(
            { 
                userId: user.id,
                email: user.email,
                role: user.role
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        console.log('Login successful for:', email);

        // Return user data and token
        res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                companyName: user.companyName,
                gstin: user.gstin,
                address: user.address,
                role: user.role,
                profile: user.profile,
                preferences: user.preferences
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error logging in' });
    }
});

// Token validation route
router.get('/validate', (req, res) => {
    console.log('Token validation request');
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        console.log('No token provided');
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log('Token decoded:', decoded);
        
        // Find user
        const user = mockUsers.find(u => u.id === decoded.userId);
        
        if (!user) {
            console.log('User not found for token');
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('Token validation successful for:', user.email);

        // Return validation result
        res.json({
            valid: true,
            user: {
                id: user.id,
                email: user.email,
                companyName: user.companyName,
                gstin: user.gstin,
                address: user.address,
                role: user.role,
                profile: user.profile,
                preferences: user.preferences
            }
        });
    } catch (error) {
        console.error('Token validation error:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
});

module.exports = router;

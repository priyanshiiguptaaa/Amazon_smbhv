require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const createTestUser = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/freshfruits');
        
        // Check if test user already exists
        const existingUser = await User.findOne({ email: 'test@example.com' });
        if (existingUser) {
            console.log('Test user already exists');
            process.exit(0);
        }

        // Create test user
        const testUser = new User({
            companyName: 'Test Company',
            email: 'test@example.com',
            password: 'password123',
            gstin: 'TEST1234567890',
            address: {
                street: '123 Test Street',
                city: 'Test City',
                state: 'Test State',
                country: 'India',
                zipCode: '123456'
            }
        });

        await testUser.save();
        console.log('Test user created successfully');
        console.log('Login credentials:');
        console.log('Email: test@example.com');
        console.log('Password: password123');
    } catch (error) {
        console.error('Error creating test user:', error);
    } finally {
        await mongoose.disconnect();
    }
};

createTestUser();

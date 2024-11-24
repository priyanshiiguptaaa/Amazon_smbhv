const mockUsers = [
    {
        id: 1,
        email: 'test@example.com',
        password: 'password123',
        companyName: 'FreshFruits Export Ltd',
        gstin: 'GSTIN123456789',
        address: {
            street: '123 Export Lane',
            city: 'Mumbai',
            state: 'Maharashtra',
            country: 'India',
            pincode: '400001'
        },
        role: 'admin',
        profile: {
            name: 'Test User',
            phone: '+91 9876543210',
            designation: 'Export Manager'
        },
        preferences: {
            notifications: true,
            language: 'en',
            currency: 'USD'
        },
        amazonCredentials: {
            sellerId: 'SELLER123',
            marketplaceId: 'MARKET123',
            refreshToken: 'REFRESH123'
        }
    }
];

module.exports = mockUsers;

const mockInventory = [
    {
        sku: "TEX-SAR-001",
        name: "Cotton Sarees - Handloom",
        category: "Textiles",
        tags: ["handloom", "cotton", "traditional"],
        description: "Traditional handloom cotton sarees from Tamil Nadu",
        stock: 200,
        price: 29.99,
        stockAlert: 50,
        unit: "piece",
        imageUrl: "https://images.unsplash.com/photo-1610030468828-98837265a208?auto=format&fit=crop&q=80&w=1000",
        expiryDate: null,
        variants: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        sku: "HND-JWL-002",
        name: "Handcrafted Silver Jewelry Set",
        category: "Handicrafts",
        tags: ["handcrafted", "silver", "jewelry"],
        description: "Artisanal silver jewelry set from Rajasthan",
        stock: 45,
        price: 89.99,
        stockAlert: 10,
        unit: "set",
        imageUrl: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=1000",
        expiryDate: null,
        variants: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        sku: "SPC-TUR-003",
        name: "Organic Turmeric Powder",
        category: "Spices",
        tags: ["organic", "spices", "export"],
        description: "Premium organic turmeric from Kerala farms",
        stock: 500,
        price: 12.99,
        stockAlert: 100,
        unit: "kg",
        unitConversions: {
            kg: 1,
            lbs: 2.20462,
            oz: 35.274
        },
        imageUrl: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=1000",
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year from now
        variants: [
            { sku: "SPC-TUR-003-100G", size: "100g" },
            { sku: "SPC-TUR-003-500G", size: "500g" },
            { sku: "SPC-TUR-003-1KG", size: "1kg" }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        sku: "LEA-WAL-004",
        name: "Leather Wallet Collection",
        category: "Leather Goods",
        tags: ["leather", "wallet", "handcrafted"],
        description: "Handcrafted leather wallets from Kanpur",
        stock: 0,
        price: 34.99,
        stockAlert: 10,
        unit: "piece",
        imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=1000",
        expiryDate: null,
        variants: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        sku: "HND-RUG-005",
        name: "Kashmiri Wool Carpet",
        category: "Handicrafts",
        tags: ["handicrafts", "wool", "carpet"],
        description: "Traditional hand-knotted wool carpets from Kashmir",
        stock: 25,
        price: 299.99,
        stockAlert: 5,
        unit: "piece",
        imageUrl: "https://images.unsplash.com/photo-1584286595398-a59511d0a1e7?auto=format&fit=crop&q=80&w=1000",
        expiryDate: null,
        variants: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        sku: "TEX-SHL-006",
        name: "Pashmina Shawls",
        category: "Textiles",
        tags: ["pashmina", "shawls", "handloom"],
        description: "Pure pashmina shawls from Ladakh",
        stock: 150,
        price: 149.99,
        stockAlert: 20,
        unit: "piece",
        imageUrl: "https://images.unsplash.com/photo-1601244005535-a48d21d951ac?auto=format&fit=crop&q=80&w=1000",
        expiryDate: null,
        variants: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];

module.exports = mockInventory;

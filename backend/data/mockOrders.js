const mockOrders = [
    {
        orderId: "ORD-2023-001",
        customerName: "Ethnic Boutique LLC",
        customerLocation: "New York, USA",
        orderDate: "2023-10-25",
        status: "Processing",
        items: [
            {
                sku: "TEX-SAR-001",
                name: "Cotton Sarees - Handloom",
                quantity: 50,
                price: 29.99
            },
            {
                sku: "TEX-SHL-006",
                name: "Pashmina Shawls",
                quantity: 20,
                price: 149.99
            }
        ],
        totalAmount: 4499.50,
        shippingMethod: "Air Freight",
        estimatedDelivery: "2023-11-15"
    },
    {
        orderId: "ORD-2023-002",
        customerName: "Spice World GmbH",
        customerLocation: "Hamburg, Germany",
        orderDate: "2023-10-23",
        status: "Shipped",
        items: [
            {
                sku: "SPC-TUR-003",
                name: "Organic Turmeric Powder",
                quantity: 300,
                price: 12.99
            }
        ],
        totalAmount: 3897.00,
        shippingMethod: "Sea Freight",
        estimatedDelivery: "2023-11-20"
    },
    {
        orderId: "ORD-2023-003",
        customerName: "Luxury Goods Co",
        customerLocation: "Tokyo, Japan",
        orderDate: "2023-10-20",
        status: "Delivered",
        items: [
            {
                sku: "HND-JWL-002",
                name: "Handcrafted Silver Jewelry Set",
                quantity: 15,
                price: 89.99
            },
            {
                sku: "HND-RUG-005",
                name: "Kashmiri Wool Carpet",
                quantity: 5,
                price: 299.99
            }
        ],
        totalAmount: 2849.80,
        shippingMethod: "Air Freight",
        estimatedDelivery: "2023-10-25"
    },
    {
        orderId: "ORD-2023-004",
        customerName: "Fashion House SA",
        customerLocation: "Paris, France",
        orderDate: "2023-10-26",
        status: "Pending",
        items: [
            {
                sku: "TEX-SHL-006",
                name: "Pashmina Shawls",
                quantity: 30,
                price: 149.99
            }
        ],
        totalAmount: 4499.70,
        shippingMethod: "Air Freight",
        estimatedDelivery: "2023-11-10"
    },
    {
        orderId: "ORD-2023-005",
        customerName: "Leather Goods Ltd",
        customerLocation: "Melbourne, Australia",
        orderDate: "2023-10-24",
        status: "Processing",
        items: [
            {
                sku: "LEA-WAL-004",
                name: "Leather Wallet Collection",
                quantity: 100,
                price: 34.99
            }
        ],
        totalAmount: 3499.00,
        shippingMethod: "Air Freight",
        estimatedDelivery: "2023-11-05"
    }
];

module.exports = mockOrders;

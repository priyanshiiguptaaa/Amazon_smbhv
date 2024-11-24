export const mockOrders = [
    {
        orderId: "ORD-001",
        customerName: "Global Trade Co",
        orderDate: "2024-01-15",
        status: "Processing",
        items: [
            { name: "Industrial Machinery", quantity: 2, price: 15000 },
            { name: "Electronic Components", quantity: 100, price: 50 }
        ],
        totalAmount: 35000,
        destination: "Singapore",
        paymentStatus: "Paid",
        documents: ["Invoice", "Packing List", "Bill of Lading"]
    },
    {
        orderId: "ORD-002",
        customerName: "Tech Solutions Ltd",
        orderDate: "2024-01-18",
        status: "Shipped",
        items: [
            { name: "Server Equipment", quantity: 5, price: 8000 },
            { name: "Network Devices", quantity: 20, price: 500 }
        ],
        totalAmount: 50000,
        destination: "Dubai",
        paymentStatus: "Paid",
        documents: ["Invoice", "Certificate of Origin", "Insurance"]
    },
    {
        orderId: "ORD-003",
        customerName: "Retail Dynamics",
        orderDate: "2024-01-20",
        status: "Pending",
        items: [
            { name: "Consumer Electronics", quantity: 1000, price: 100 },
            { name: "Accessories", quantity: 2000, price: 10 }
        ],
        totalAmount: 120000,
        destination: "Hong Kong",
        paymentStatus: "Pending",
        documents: ["Proforma Invoice"]
    },
    {
        orderId: "ORD-004",
        customerName: "Medical Supplies Inc",
        orderDate: "2024-01-22",
        status: "Completed",
        items: [
            { name: "Medical Equipment", quantity: 10, price: 12000 },
            { name: "Surgical Supplies", quantity: 500, price: 100 }
        ],
        totalAmount: 170000,
        destination: "Germany",
        paymentStatus: "Paid",
        documents: ["Invoice", "Health Certificate", "Export License"]
    },
    {
        orderId: "ORD-005",
        customerName: "Automotive Parts Co",
        orderDate: "2024-01-25",
        status: "Processing",
        items: [
            { name: "Engine Components", quantity: 200, price: 500 },
            { name: "Spare Parts", quantity: 1000, price: 50 }
        ],
        totalAmount: 150000,
        destination: "Brazil",
        paymentStatus: "Partial",
        documents: ["Invoice", "Technical Specifications"]
    }
];

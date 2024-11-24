export const mockShipments = [
    {
        shipmentId: "SHP-001",
        orderId: "ORD-001",
        status: "In Transit",
        origin: "Mumbai, India",
        destination: "Singapore",
        carrier: "Maersk Line",
        trackingNumber: "ML123456789",
        estimatedDelivery: "2024-02-15",
        customsStatus: "Cleared",
        documents: ["Bill of Lading", "Packing List", "Certificate of Origin"],
        timeline: [
            { date: "2024-01-15", status: "Order Received" },
            { date: "2024-01-18", status: "Customs Clearance" },
            { date: "2024-01-20", status: "Departed Port" }
        ]
    },
    {
        shipmentId: "SHP-002",
        orderId: "ORD-002",
        status: "Customs Clearance",
        origin: "Delhi, India",
        destination: "Dubai, UAE",
        carrier: "Emirates Shipping",
        trackingNumber: "ES987654321",
        estimatedDelivery: "2024-02-20",
        customsStatus: "In Progress",
        documents: ["Commercial Invoice", "Export Declaration", "Insurance Certificate"],
        timeline: [
            { date: "2024-01-18", status: "Order Received" },
            { date: "2024-01-22", status: "Documentation Complete" }
        ]
    },
    {
        shipmentId: "SHP-003",
        orderId: "ORD-003",
        status: "Preparing",
        origin: "Chennai, India",
        destination: "Hong Kong",
        carrier: "COSCO",
        trackingNumber: "CS456789123",
        estimatedDelivery: "2024-02-25",
        customsStatus: "Pending",
        documents: ["Proforma Invoice"],
        timeline: [
            { date: "2024-01-20", status: "Order Received" }
        ]
    },
    {
        shipmentId: "SHP-004",
        orderId: "ORD-004",
        status: "Delivered",
        origin: "Bangalore, India",
        destination: "Hamburg, Germany",
        carrier: "Hapag-Lloyd",
        trackingNumber: "HL789123456",
        estimatedDelivery: "2024-01-20",
        customsStatus: "Cleared",
        documents: ["Bill of Lading", "Health Certificate", "EUR.1 Movement Certificate"],
        timeline: [
            { date: "2024-01-22", status: "Order Received" },
            { date: "2024-01-25", status: "Customs Clearance" },
            { date: "2024-01-28", status: "Departed Port" },
            { date: "2024-02-10", status: "Delivered" }
        ]
    },
    {
        shipmentId: "SHP-005",
        orderId: "ORD-005",
        status: "Documentation",
        origin: "Pune, India",
        destination: "Sao Paulo, Brazil",
        carrier: "MSC",
        trackingNumber: "MSC321654987",
        estimatedDelivery: "2024-03-01",
        customsStatus: "Pending",
        documents: ["Draft Bill of Lading"],
        timeline: [
            { date: "2024-01-25", status: "Order Received" }
        ]
    }
];

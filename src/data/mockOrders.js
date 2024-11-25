export const mockOrders = [
  {
    orderId: 'ORD-2024-001',
    orderNumber: 'ORD-2024-001',
    customerName: 'John Smith',
    shippingAddress: '123 Main St, New York, NY 10001, USA',
    totalAmount: 299.99,
    status: 'Completed',
    items: [
      { id: 1, name: 'Premium Widget', quantity: 2, price: 149.99 }
    ],
    origin: 'Mumbai, India',
    destination: 'New York, USA',
    carrier: 'DHL Express',
    weight: 2.5,
    route: 'BOM-JFK',
    productId: 'WIDGET-001',
    category: 'Electronics',
    price: 299.99,
    region: 'North America',
    season: 'Spring'
  },
  {
    orderId: 'ORD-2024-002',
    orderNumber: 'ORD-2024-002',
    customerName: 'Emma Johnson',
    shippingAddress: '456 Park Ave, Los Angeles, CA 90001, USA',
    totalAmount: 199.99,
    status: 'Processing',
    items: [
      { id: 2, name: 'Deluxe Gadget', quantity: 1, price: 199.99 }
    ],
    origin: 'Delhi, India',
    destination: 'Los Angeles, USA',
    carrier: 'FedEx',
    weight: 1.8,
    route: 'DEL-LAX',
    productId: 'GADGET-001',
    category: 'Electronics',
    price: 199.99,
    region: 'North America',
    season: 'Summer'
  },
  {
    orderId: 'ORD-2024-003',
    orderNumber: 'ORD-2024-003',
    customerName: 'Michael Brown',
    shippingAddress: '789 Oak Rd, Chicago, IL 60601, USA',
    totalAmount: 499.99,
    status: 'Pending',
    items: [
      { id: 3, name: 'Ultra Device', quantity: 1, price: 499.99 }
    ],
    origin: 'Bangalore, India',
    destination: 'Chicago, USA',
    carrier: 'UPS',
    weight: 3.2,
    route: 'BLR-ORD',
    productId: 'DEVICE-001',
    category: 'Electronics',
    price: 499.99,
    region: 'North America',
    season: 'Fall'
  }
];

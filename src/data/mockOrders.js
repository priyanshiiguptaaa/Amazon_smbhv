export const mockOrders = [
  {
    orderId: 'ORD-2024-001',
    orderNumber: 'ORD-2024-001',
    customerName: 'Raj Textiles Pvt Ltd',
    shippingAddress: '123 Fashion Street, Mumbai, Maharashtra 400001',
    totalAmount: 125000,
    status: 'Completed',
    items: [
      { id: 1, name: 'Cotton Fabric Rolls', quantity: 50, price: 2500 }
    ],
    origin: 'Surat, Gujarat',
    destination: 'Mumbai, Maharashtra',
    carrier: 'SafeXpress',
    weight: 250,
    route: 'STV-BOM',
    productId: 'FAB-001',
    category: 'Textiles',
    price: 2500,
    region: 'West India',
    season: 'Summer'
  },
  {
    orderId: 'ORD-2024-002',
    orderNumber: 'ORD-2024-002',
    customerName: 'Chennai Spice Traders',
    shippingAddress: '456 Mint Street, Chennai, Tamil Nadu 600001',
    totalAmount: 85000,
    status: 'Processing',
    items: [
      { id: 2, name: 'Organic Turmeric Powder', quantity: 100, price: 850 }
    ],
    origin: 'Erode, Tamil Nadu',
    destination: 'Chennai, Tamil Nadu',
    carrier: 'VRL Logistics',
    weight: 100,
    route: 'ERD-MAA',
    productId: 'SPICE-001',
    category: 'Spices',
    price: 850,
    region: 'South India',
    season: 'All Season'
  },
  {
    orderId: 'ORD-2024-003',
    orderNumber: 'ORD-2024-003',
    customerName: 'Delhi Handicrafts Emporium',
    shippingAddress: '789 Chandni Chowk, Delhi 110006',
    totalAmount: 250000,
    status: 'Pending',
    items: [
      { id: 3, name: 'Handwoven Carpets', quantity: 25, price: 10000 }
    ],
    origin: 'Bhadohi, UP',
    destination: 'Delhi',
    carrier: 'Delhivery',
    weight: 125,
    route: 'BHD-DEL',
    productId: 'CRPT-001',
    category: 'Handicrafts',
    price: 10000,
    region: 'North India',
    season: 'Winter'
  },
  {
    orderId: 'ORD-2024-004',
    orderNumber: 'ORD-2024-004',
    customerName: 'Jaipur Gems & Jewels',
    shippingAddress: 'Shop 101, Johari Bazaar, Jaipur, Rajasthan 302003',
    totalAmount: 450000,
    status: 'Processing',
    items: [
      { id: 4, name: 'Silver Jewelry Set', quantity: 15, price: 30000 }
    ],
    origin: 'Jaipur, Rajasthan',
    destination: 'Mumbai, Maharashtra',
    carrier: 'Blue Dart',
    weight: 5,
    route: 'JAI-BOM',
    productId: 'JWL-001',
    category: 'Jewelry',
    price: 30000,
    region: 'West India',
    season: 'Wedding'
  },
  {
    orderId: 'ORD-2024-005',
    orderNumber: 'ORD-2024-005',
    customerName: 'Ludhiana Woollen Mills',
    shippingAddress: 'Industrial Area Phase 3, Ludhiana, Punjab 141003',
    totalAmount: 180000,
    status: 'Completed',
    items: [
      { id: 5, name: 'Winter Shawls', quantity: 200, price: 900 }
    ],
    origin: 'Ludhiana, Punjab',
    destination: 'Delhi',
    carrier: 'TCI Express',
    weight: 80,
    route: 'LDH-DEL',
    productId: 'WINT-001',
    category: 'Apparel',
    price: 900,
    region: 'North India',
    season: 'Winter'
  },
  {
    orderId: 'ORD-2024-006',
    orderNumber: 'ORD-2024-006',
    customerName: 'Kolkata Tea Merchants',
    shippingAddress: 'Burrabazar, Kolkata, West Bengal 700007',
    totalAmount: 95000,
    status: 'Pending',
    items: [
      { id: 6, name: 'Premium Darjeeling Tea', quantity: 100, price: 950 }
    ],
    origin: 'Darjeeling, West Bengal',
    destination: 'Kolkata, West Bengal',
    carrier: 'GATI',
    weight: 50,
    route: 'DAJ-CCU',
    productId: 'TEA-001',
    category: 'Beverages',
    price: 950,
    region: 'East India',
    season: 'Spring'
  },
  {
    orderId: 'ORD-2024-007',
    orderNumber: 'ORD-2024-007',
    customerName: 'Agra Leather Works',
    shippingAddress: 'Sadar Bazaar, Agra, Uttar Pradesh 282001',
    totalAmount: 165000,
    status: 'Processing',
    items: [
      { id: 7, name: 'Leather Bags', quantity: 50, price: 3300 }
    ],
    origin: 'Agra, UP',
    destination: 'Delhi',
    carrier: 'Delhivery',
    weight: 75,
    route: 'AGR-DEL',
    productId: 'BAG-001',
    category: 'Leather Goods',
    price: 3300,
    region: 'North India',
    season: 'All Season'
  },
  {
    orderId: 'ORD-2024-008',
    orderNumber: 'ORD-2024-008',
    customerName: 'Pune Auto Components',
    shippingAddress: 'MIDC Industrial Area, Pune, Maharashtra 411019',
    totalAmount: 320000,
    status: 'Completed',
    items: [
      { id: 8, name: 'Brake Assembly Units', quantity: 400, price: 800 }
    ],
    origin: 'Pune, Maharashtra',
    destination: 'Chennai, Tamil Nadu',
    carrier: 'SafeXpress',
    weight: 600,
    route: 'PNQ-MAA',
    productId: 'AUTO-001',
    category: 'Automotive',
    price: 800,
    region: 'South India',
    season: 'All Season'
  },
  {
    orderId: 'ORD-2024-009',
    orderNumber: 'ORD-2024-009',
    customerName: 'Moradabad Brass Works',
    shippingAddress: 'Brass Market, Moradabad, Uttar Pradesh 244001',
    totalAmount: 275000,
    status: 'Pending',
    items: [
      { id: 9, name: 'Brass Decorative Items', quantity: 500, price: 550 }
    ],
    origin: 'Moradabad, UP',
    destination: 'Mumbai, Maharashtra',
    carrier: 'VRL Logistics',
    weight: 300,
    route: 'MBD-BOM',
    productId: 'DCOR-001',
    category: 'Home Decor',
    price: 550,
    region: 'West India',
    season: 'Festival'
  },
  {
    orderId: 'ORD-2024-010',
    orderNumber: 'ORD-2024-010',
    customerName: 'Coimbatore Mills Ltd',
    shippingAddress: 'Textile Park, Coimbatore, Tamil Nadu 641014',
    totalAmount: 420000,
    status: 'Processing',
    items: [
      { id: 10, name: 'Yarn Bundles', quantity: 1000, price: 420 }
    ],
    origin: 'Coimbatore, Tamil Nadu',
    destination: 'Surat, Gujarat',
    carrier: 'GATI',
    weight: 800,
    route: 'CJB-STV',
    productId: 'YRN-001',
    category: 'Textiles',
    price: 420,
    region: 'West India',
    season: 'All Season'
  },
  {
    orderId: 'ORD-2024-011',
    orderNumber: 'ORD-2024-011',
    customerName: 'Bhuj Handicrafts',
    shippingAddress: 'Craft Park, Bhuj, Gujarat 370001',
    totalAmount: 145000,
    status: 'Completed',
    items: [
      { id: 11, name: 'Kutch Embroidery Products', quantity: 100, price: 1450 }
    ],
    origin: 'Bhuj, Gujarat',
    destination: 'Delhi',
    carrier: 'Blue Dart',
    weight: 40,
    route: 'BHJ-DEL',
    productId: 'HAND-001',
    category: 'Handicrafts',
    price: 1450,
    region: 'North India',
    season: 'Festival'
  },
  {
    orderId: 'ORD-2024-012',
    orderNumber: 'ORD-2024-012',
    customerName: 'Kanpur Leather Exports',
    shippingAddress: 'Industrial Area, Kanpur, Uttar Pradesh 208001',
    totalAmount: 550000,
    status: 'Pending',
    items: [
      { id: 12, name: 'Leather Shoes Bulk', quantity: 1000, price: 550 }
    ],
    origin: 'Kanpur, UP',
    destination: 'Mumbai, Maharashtra',
    carrier: 'TCI Express',
    weight: 450,
    route: 'KNU-BOM',
    productId: 'SHOE-001',
    category: 'Footwear',
    price: 550,
    region: 'West India',
    season: 'All Season'
  }
];

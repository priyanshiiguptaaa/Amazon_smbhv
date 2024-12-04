export const mockOrders = [
  {
    orderId: 'ORD-2024-001',
    orderNumber: 'ORD-2024-001',
    customerName: 'Walmart Inc.',
    customerCountry: 'United States',
    shippingAddress: '702 SW 8th Street, Bentonville, Arkansas 72716, USA',
    totalAmount: 850000, // In INR (~$10,200)
    status: 'Completed',
    items: [
      { id: 1, name: 'Organic Cotton T-Shirts', quantity: 2500, price: 340, unit: 'pieces' } // ~$4 per piece
    ],
    origin: 'Tirupur, Tamil Nadu, India',
    destination: 'Los Angeles, USA',
    carrier: 'Maersk Line',
    weight: 1250,
    route: 'TUP-LAX',
    productId: 'APRL-001',
    category: 'Apparel',
    price: 340,
    region: 'North America',
    season: 'Summer',
    exportDocuments: ['Form-GST', 'Certificate of Origin', 'Packing List']
  },
  {
    orderId: 'ORD-2024-002',
    orderNumber: 'ORD-2024-002',
    customerName: 'Marks & Spencer plc',
    customerCountry: 'United Kingdom',
    shippingAddress: 'Waterside House, 35 North Wharf Road, London W2 1NW, UK',
    totalAmount: 925000, // In INR (~£8,800)
    status: 'Processing',
    items: [
      { id: 2, name: 'Hand-Knotted Wool Carpets', quantity: 100, price: 9250, unit: 'pieces' } // ~£88 per piece
    ],
    origin: 'Bhadohi, Uttar Pradesh, India',
    destination: 'London, UK',
    carrier: 'MSC Shipping',
    weight: 500,
    route: 'BHD-LHR',
    productId: 'CRPT-001',
    category: 'Home Furnishing',
    price: 9250,
    region: 'Europe',
    season: 'All Season',
    exportDocuments: ['EUR.1 Certificate', 'GST Invoice', 'Bill of Lading']
  },
  {
    orderId: 'ORD-2024-003',
    orderNumber: 'ORD-2024-003',
    customerName: 'MUJI Co., Ltd',
    customerCountry: 'Japan',
    shippingAddress: '4-26-3 Setagaya, Tokyo 154-8525, Japan',
    totalAmount: 720000, // In INR (~¥1,320,000)
    status: 'Pending',
    items: [
      { id: 3, name: 'Handloom Cotton Fabrics', quantity: 4000, price: 180, unit: 'meters' } // ~¥330 per meter
    ],
    origin: 'Kannur, Kerala, India',
    destination: 'Tokyo, Japan',
    carrier: 'ONE Line',
    weight: 1200,
    route: 'CNN-TYO',
    productId: 'FAB-001',
    category: 'Textiles',
    price: 180,
    region: 'Asia Pacific',
    season: 'All Season',
    exportDocuments: ['Certificate of Origin', 'Packing List', 'Commercial Invoice']
  },
  {
    orderId: 'ORD-2024-004',
    orderNumber: 'ORD-2024-004',
    customerName: 'Whole Foods Market',
    customerCountry: 'United States',
    shippingAddress: '550 Bowie Street, Austin, TX 78703, USA',
    totalAmount: 1250000, // In INR (~$15,000)
    status: 'Processing',
    items: [
      { id: 4, name: 'Organic Turmeric Powder', quantity: 5000, price: 250, unit: 'kg' } // ~$3 per kg
    ],
    origin: 'Erode, Tamil Nadu, India',
    destination: 'Miami, USA',
    carrier: 'CMA CGM',
    weight: 5000,
    route: 'ERD-MIA',
    productId: 'SPICE-001',
    category: 'Spices',
    price: 250,
    region: 'North America',
    season: 'All Season',
    exportDocuments: ['FDA Registration', 'Organic Certificate', 'Phytosanitary Certificate']
  },
  {
    orderId: 'ORD-2024-005',
    orderNumber: 'ORD-2024-005',
    customerName: 'Galeries Lafayette',
    customerCountry: 'France',
    shippingAddress: '40 Boulevard Haussmann, 75009 Paris, France',
    totalAmount: 1350000, // In INR (~€15,000)
    status: 'Completed',
    items: [
      { id: 5, name: 'Designer Leather Bags', quantity: 300, price: 4500, unit: 'pieces' } // ~€50 per piece
    ],
    origin: 'Kanpur, Uttar Pradesh, India',
    destination: 'Paris, France',
    carrier: 'Hapag-Lloyd',
    weight: 600,
    route: 'KNU-PAR',
    productId: 'LTHR-001',
    category: 'Leather Goods',
    price: 4500,
    region: 'Europe',
    season: 'Fall',
    exportDocuments: ['EUR.1 Certificate', 'REACH Compliance', 'ATA Carnet']
  },
  {
    orderId: 'ORD-2024-006',
    orderNumber: 'ORD-2024-006',
    customerName: 'Zara (Inditex)',
    customerCountry: 'Spain',
    shippingAddress: 'Avenida de la Diputación, Arteixo, A Coruña, Spain',
    totalAmount: 675000, // In INR (~€7,500)
    status: 'Processing',
    items: [
      { id: 6, name: 'Embroidered Silk Scarves', quantity: 1500, price: 450, unit: 'pieces' } // ~€5 per piece
    ],
    origin: 'Varanasi, Uttar Pradesh, India',
    destination: 'Barcelona, Spain',
    carrier: 'MSC Shipping',
    weight: 300,
    route: 'VNS-BCN',
    productId: 'SILK-001',
    category: 'Accessories',
    price: 450,
    region: 'Europe',
    season: 'Spring',
    exportDocuments: ['EUR.1 Certificate', 'Textile Certificate', 'GST Invoice']
  },
  {
    orderId: 'ORD-2024-007',
    orderNumber: 'ORD-2024-007',
    customerName: 'Crate & Barrel',
    customerCountry: 'United States',
    shippingAddress: '1250 Techny Road, Northbrook, IL 60062, USA',
    totalAmount: 825000, // In INR (~$9,900)
    status: 'Pending',
    items: [
      { id: 7, name: 'Handcrafted Brass Decor', quantity: 1100, price: 750, unit: 'pieces' } // ~$9 per piece
    ],
    origin: 'Moradabad, Uttar Pradesh, India',
    destination: 'New York, USA',
    carrier: 'Maersk Line',
    weight: 1650,
    route: 'MBD-NYC',
    productId: 'DCOR-001',
    category: 'Home Decor',
    price: 750,
    region: 'North America',
    season: 'All Season',
    exportDocuments: ['Form-GST', 'Certificate of Origin', 'Material Safety Data Sheet']
  },
  {
    orderId: 'ORD-2024-008',
    orderNumber: 'ORD-2024-008',
    customerName: 'Woolworths Group',
    customerCountry: 'Australia',
    shippingAddress: '1 Woolworths Way, Bella Vista NSW 2153, Australia',
    totalAmount: 1075000, // In INR (~AUD 19,500)
    status: 'Processing',
    items: [
      { id: 8, name: 'Organic Basmati Rice', quantity: 10000, price: 107.5, unit: 'kg' } // ~AUD 1.95 per kg
    ],
    origin: 'Dehradun, Uttarakhand, India',
    destination: 'Sydney, Australia',
    carrier: 'COSCO Shipping',
    weight: 10000,
    route: 'DED-SYD',
    productId: 'RICE-001',
    category: 'Food & Beverages',
    price: 107.5,
    region: 'Oceania',
    season: 'All Season',
    exportDocuments: ['Phytosanitary Certificate', 'Non-GMO Certificate', 'Certificate of Origin']
  },
  {
    orderId: 'ORD-2024-009',
    orderNumber: 'ORD-2024-009',
    customerName: 'Anthropologie',
    customerCountry: 'United States',
    shippingAddress: '5000 South Broad Street, Philadelphia, PA 19112, USA',
    totalAmount: 960000, // In INR (~$11,500)
    status: 'Completed',
    items: [
      { id: 9, name: 'Block Print Bedspreads', quantity: 800, price: 1200, unit: 'pieces' } // ~$14.40 per piece
    ],
    origin: 'Jaipur, Rajasthan, India',
    destination: 'Los Angeles, USA',
    carrier: 'Hapag-Lloyd',
    weight: 1200,
    route: 'JAI-LAX',
    productId: 'HOME-001',
    category: 'Home Textiles',
    price: 1200,
    region: 'North America',
    season: 'Spring/Summer',
    exportDocuments: ['Form-GST', 'Certificate of Origin', 'ATA Carnet']
  },
  {
    orderId: 'ORD-2024-010',
    orderNumber: 'ORD-2024-010',
    customerName: 'Tesco PLC',
    customerCountry: 'United Kingdom',
    shippingAddress: 'Tesco House, Shire Park, Kestrel Way, Welwyn Garden City, UK',
    totalAmount: 750000, // In INR (~£7,100)
    status: 'Processing',
    items: [
      { id: 10, name: 'Organic Tea Assortment', quantity: 2500, price: 300, unit: 'kg' } // ~£2.85 per kg
    ],
    origin: 'Darjeeling, West Bengal, India',
    destination: 'Southampton, UK',
    carrier: 'ONE Line',
    weight: 2500,
    route: 'DAJ-SOU',
    productId: 'TEA-001',
    category: 'Beverages',
    price: 300,
    region: 'Europe',
    season: 'All Season',
    exportDocuments: ['EUR.1 Certificate', 'Organic Certificate', 'Health Certificate']
  }
];

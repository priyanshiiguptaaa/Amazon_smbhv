// Mock data for sustainability metrics
const mockCarbonData = {
  shipping: {
    value: '245.3',
    trend: '-12.5',
  },
  packaging: {
    value: '156.8',
    trend: '-8.2',
  }
};

const mockRecommendations = [
  {
    title: 'Optimize Shipping Routes',
    description: 'Use AI-powered route optimization to reduce fuel consumption and emissions.',
  },
  {
    title: 'Eco-friendly Packaging',
    description: 'Switch to recyclable and biodegradable packaging materials.',
  },
  {
    title: 'Local Warehousing',
    description: 'Establish local warehousing to reduce long-distance shipping.',
  }
];

const mockEcoTips = {
  shipping: [
    'Consolidate shipments to reduce trips',
    'Use electric vehicles for local deliveries',
    'Optimize loading to maximize cargo space'
  ],
  packaging: [
    'Use right-sized packaging',
    'Choose recycled materials',
    'Minimize plastic usage'
  ]
};

export const calculateCarbonFootprint = async (period) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockCarbonData;
};

export const getEcoTips = async (category) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return category === 'all' ? mockEcoTips : mockEcoTips[category];
};

export const calculateSustainabilityScore = async () => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return {
    overall: 78,
    shipping: 82,
    packaging: 75
  };
};

export const getSustainabilityRecommendations = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockRecommendations;
};

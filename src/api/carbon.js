// Mock data for eco-friendly tips by category
const mockEcoTips = {
  packaging: [
    {
      title: 'Use Biodegradable Packaging',
      description: 'Switch to corn starch or mushroom-based packaging materials that naturally decompose.',
      impact: 'Reduces landfill waste by 70%',
      implementation: 'Medium',
      cost: '₹₹',
      roi: '18 months',
      suppliers: [
        { name: 'EcoPack India', location: 'Mumbai', rating: 4.5 },
        { name: 'Green Materials Co', location: 'Bangalore', rating: 4.2 }
      ],
      certifications: ['ISO 14001', 'Biodegradable Products Institute'],
      caseStudies: ['Flipkart Green Packaging Initiative', 'Amazon Packaging-Free Shipping']
    },
    {
      title: 'Right-Size Packaging',
      description: 'Use AI-driven algorithms to select the optimal box size for each order.',
      impact: 'Reduces material waste by 40%',
      implementation: 'Easy',
      cost: '₹',
      roi: '12 months',
      suppliers: [
        { name: 'PackSize India', location: 'Delhi', rating: 4.8 },
        { name: 'SmartBox Solutions', location: 'Pune', rating: 4.4 }
      ],
      certifications: ['ISO 9001'],
      caseStudies: ['Myntra Box Optimization Program']
    }
  ],
  shipping: [
    {
      title: 'Local Delivery Partners',
      description: 'Partner with local logistics providers using electric vehicles or bicycles.',
      impact: 'Reduces emissions by 50%',
      implementation: 'Medium',
      cost: '₹₹',
      roi: '24 months',
      suppliers: [
        { name: 'EcoMove Express', location: 'Karnataka', rating: 4.6 },
        { name: 'Green Wheels Logistics', location: 'Maharashtra', rating: 4.3 }
      ],
      certifications: ['ISO 14001'],
      caseStudies: ['Flipkart Electric Delivery Program']
    },
    {
      title: 'Route Optimization',
      description: 'Implement AI-based route planning to minimize delivery distances.',
      impact: 'Reduces fuel consumption by 30%',
      implementation: 'Complex',
      cost: '₹₹₹',
      roi: '36 months',
      suppliers: [
        { name: 'RouteOptimization Inc', location: 'USA', rating: 4.9 },
        { name: 'LogisticsOptimization Solutions', location: 'UK', rating: 4.5 }
      ],
      certifications: ['ISO 9001'],
      caseStudies: ['Amazon Route Optimization Program']
    }
  ],
  warehouse: [
    {
      title: 'Solar Power Installation',
      description: 'Install rooftop solar panels on warehouses for renewable energy.',
      impact: 'Reduces energy costs by 60%',
      implementation: 'Complex',
      cost: '₹₹₹₹',
      roi: '48 months',
      suppliers: [
        { name: 'SolarPower India', location: 'Gujarat', rating: 4.7 },
        { name: 'RenewableEnergy Solutions', location: 'Tamil Nadu', rating: 4.4 }
      ],
      certifications: ['ISO 14001'],
      caseStudies: ['Flipkart Solar-Powered Warehouse']
    },
    {
      title: 'Smart Lighting Systems',
      description: 'Install motion sensors and LED lights for efficient lighting.',
      impact: 'Reduces electricity usage by 40%',
      implementation: 'Easy',
      cost: '₹₹',
      roi: '18 months',
      suppliers: [
        { name: 'SmartLighting Solutions', location: 'Delhi', rating: 4.6 },
        { name: 'EnergyEfficient Lighting', location: 'Mumbai', rating: 4.3 }
      ],
      certifications: ['ISO 9001'],
      caseStudies: ['Amazon Smart Lighting Program']
    }
  ],
  waste: [
    {
      title: 'Recycling Program',
      description: 'Implement comprehensive recycling for packaging materials.',
      impact: 'Recycles 80% of waste',
      implementation: 'Medium',
      cost: '₹₹',
      roi: '24 months',
      suppliers: [
        { name: 'RecyclingIndia', location: 'Maharashtra', rating: 4.5 },
        { name: 'WasteManagement Solutions', location: 'Karnataka', rating: 4.2 }
      ],
      certifications: ['ISO 14001'],
      caseStudies: ['Flipkart Recycling Program']
    },
    {
      title: 'Digital Documentation',
      description: 'Switch to paperless operations using digital systems.',
      impact: 'Saves 500 pages per month',
      implementation: 'Easy',
      cost: '₹',
      roi: '12 months',
      suppliers: [
        { name: 'DigitalDocumentation Inc', location: 'USA', rating: 4.8 },
        { name: 'PaperlessSolutions', location: 'UK', rating: 4.5 }
      ],
      certifications: ['ISO 9001'],
      caseStudies: ['Amazon Digital Documentation Program']
    }
  ]
};

// Mock data for heritage sites with conservation status
const mockHeritageSites = [
  {
    name: 'Taj Mahal',
    location: 'Agra, Uttar Pradesh',
    description: 'Iconic marble mausoleum facing environmental threats from air pollution and industrial emissions.',
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80',
    conservationStatus: 'At Risk',
    threats: ['Air Pollution', 'Tourism Pressure', 'Yellowing of Marble'],
    initiatives: ['Air Quality Monitoring', 'Green Belt Development']
  },
  {
    name: 'Sundarbans',
    location: 'West Bengal',
    description: 'Largest mangrove forest, crucial for biodiversity and carbon sequestration.',
    imageUrl: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=800&q=80',
    conservationStatus: 'Vulnerable',
    threats: ['Rising Sea Levels', 'Deforestation', 'Industrial Development'],
    initiatives: ['Mangrove Restoration', 'Community Conservation']
  },
  {
    name: 'Western Ghats',
    location: 'Kerala, Karnataka, Tamil Nadu',
    description: 'Mountain range known for its biodiversity and role in monsoon patterns.',
    imageUrl: 'https://images.unsplash.com/photo-1593181629936-11c609b8db9b?w=800&q=80',
    conservationStatus: 'Critical',
    threats: ['Mining', 'Habitat Fragmentation', 'Climate Change'],
    initiatives: ['Protected Areas', 'Sustainable Agriculture']
  }
];

// Sustainability goals and targets
const sustainabilityGoals = {
  2024: {
    emissions: { target: -15, current: -8 },
    renewable: { target: 30, current: 18 },
    waste: { target: -25, current: -12 }
  },
  2025: {
    emissions: { target: -30, current: -8 },
    renewable: { target: 50, current: 18 },
    waste: { target: -40, current: -12 }
  },
  2030: {
    emissions: { target: -60, current: -8 },
    renewable: { target: 100, current: 18 },
    waste: { target: -80, current: -12 }
  }
};

// Industry benchmarks
const industryBenchmarks = {
  shipping: {
    best: 12.5,
    average: 18.2,
    worst: 25.0
  },
  packaging: {
    best: 6.8,
    average: 10.1,
    worst: 15.5
  },
  warehousing: {
    best: 9.2,
    average: 14.8,
    worst: 20.3
  }
};

// Success stories and case studies
const sustainabilitySuccessStories = [
  {
    title: "Solar-Powered Warehouse Success",
    company: "GreenTech Logistics",
    location: "Maharashtra, India",
    achievement: "70% reduction in energy costs",
    implementation: "6 months",
    investment: "₹45 lakhs",
    roi: "24 months",
    steps: [
      "Energy audit conducted",
      "Solar panel installation",
      "Smart grid integration",
      "Employee training"
    ],
    results: {
      costSaving: "₹12 lakhs annually",
      carbonReduction: "45 tonnes CO2e",
      energySaving: "80,000 kWh annually"
    }
  },
  {
    title: "Electric Fleet Transformation",
    company: "EcoMove Express",
    location: "Karnataka, India",
    achievement: "50% reduction in delivery emissions",
    implementation: "12 months",
    investment: "₹85 lakhs",
    roi: "36 months",
    steps: [
      "Fleet assessment",
      "EV procurement",
      "Charging infrastructure setup",
      "Driver training program"
    ],
    results: {
      costSaving: "₹18 lakhs annually",
      carbonReduction: "60 tonnes CO2e",
      fuelSaving: "25,000 liters annually"
    }
  }
];

// Calculate detailed carbon footprint
export const calculateCarbonFootprint = async (period = 'month') => {
  await new Promise(resolve => setTimeout(resolve, 800));

  const multiplier = period === 'week' ? 1 : period === 'month' ? 4 : 48;
  
  const baseShipping = 15.5;
  const basePackaging = 8.3;
  const baseWarehousing = 12.7;

  const carbonData = {
    shipping: {
      value: (baseShipping * multiplier).toFixed(2),
      breakdown: {
        road: (8.5 * multiplier).toFixed(2),
        air: (5.0 * multiplier).toFixed(2),
        lastMile: (2.0 * multiplier).toFixed(2)
      },
      trend: '+5%',
      benchmark: {
        industry: industryBenchmarks.shipping.average,
        percentile: 65
      },
      recommendations: [
        {
          action: "Optimize delivery routes",
          potential: "15% reduction",
          investment: "₹2-3 lakhs",
          timeline: "3-6 months"
        }
      ]
    },
    packaging: {
      value: (basePackaging * multiplier).toFixed(2),
      breakdown: {
        boxes: (4.5 * multiplier).toFixed(2),
        fillers: (2.3 * multiplier).toFixed(2),
        tape: (1.5 * multiplier).toFixed(2)
      },
      trend: '-2%',
      benchmark: {
        industry: industryBenchmarks.packaging.average,
        percentile: 78
      },
      recommendations: [
        {
          action: "Switch to recycled materials",
          potential: "25% reduction",
          investment: "₹1-2 lakhs",
          timeline: "1-3 months"
        }
      ]
    },
    warehousing: {
      value: (baseWarehousing * multiplier).toFixed(2),
      breakdown: {
        electricity: (6.7 * multiplier).toFixed(2),
        heating: (4.0 * multiplier).toFixed(2),
        water: (2.0 * multiplier).toFixed(2)
      },
      trend: '-8%',
      benchmark: {
        industry: industryBenchmarks.warehousing.average,
        percentile: 82
      },
      recommendations: [
        {
          action: "Install solar panels",
          potential: "40% reduction",
          investment: "₹15-20 lakhs",
          timeline: "6-12 months"
        }
      ]
    }
  };

  const totalValue = (baseShipping + basePackaging + baseWarehousing) * multiplier;
  
  carbonData.total = {
    value: totalValue.toFixed(2),
    trend: '-2%',
    yearlyProjection: {
      baseline: (totalValue * (48 / multiplier)).toFixed(2),
      potential: (totalValue * (48 / multiplier) * 0.7).toFixed(2),
      savings: '30%'
    }
  };

  return carbonData;
};

// Get eco-friendly tips by category
export const getEcoTips = async (category = 'all') => {
  await new Promise(resolve => setTimeout(resolve, 500));
  if (category === 'all') {
    return Object.values(mockEcoTips).flat();
  }
  return mockEcoTips[category] || [];
};

// Get heritage site data
export const getHeritageData = async () => {
  await new Promise(resolve => setTimeout(resolve, 600));
  return mockHeritageSites;
};

// Calculate sustainability score
export const calculateSustainabilityScore = async () => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const scores = {
    packaging: {
      score: 75,
      improvements: ['Switch to recycled materials', 'Implement box-sizing algorithm'],
      potential: '+15 points',
      breakdown: {
        materials: 70,
        efficiency: 80,
        recycling: 75,
        innovation: 72
      }
    },
    shipping: {
      score: 60,
      improvements: ['Partner with electric vehicle fleets', 'Optimize delivery routes'],
      potential: '+25 points',
      breakdown: {
        emissions: 55,
        efficiency: 65,
        alternative: 58,
        planning: 62
      }
    },
    warehousing: {
      score: 85,
      improvements: ['Install solar panels', 'Implement rainwater harvesting'],
      potential: '+10 points',
      breakdown: {
        energy: 82,
        water: 88,
        waste: 85,
        automation: 80
      }
    }
  };

  scores.overall = Math.round(
    (scores.packaging.score + scores.shipping.score + scores.warehousing.score) / 3
  );

  return {
    ...scores,
    goals: sustainabilityGoals,
    benchmarks: industryBenchmarks
  };
};

// Get sustainability recommendations
export const getSustainabilityRecommendations = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return {
    immediate: [
      {
        title: 'Switch to LED Lighting',
        impact: 'High',
        cost: 'Low',
        timeframe: '1-2 months'
      },
      {
        title: 'Implement Digital Invoicing',
        impact: 'Medium',
        cost: 'Low',
        timeframe: '1 month'
      }
    ],
    shortTerm: [
      {
        title: 'Install Solar Panels',
        impact: 'High',
        cost: 'High',
        timeframe: '6-12 months'
      },
      {
        title: 'Electric Delivery Vehicles',
        impact: 'High',
        cost: 'High',
        timeframe: '6-8 months'
      }
    ],
    longTerm: [
      {
        title: 'Green Building Certification',
        impact: 'High',
        cost: 'High',
        timeframe: '1-2 years'
      },
      {
        title: 'Zero-Waste Operations',
        impact: 'High',
        cost: 'Medium',
        timeframe: '1-3 years'
      }
    ]
  };
};

// Get success stories
export const getSuccessStories = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return sustainabilitySuccessStories;
};

// Get carbon offset opportunities
export const getCarbonOffsetProjects = async () => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  return [
    {
      name: "Solar Power Project",
      location: "Rajasthan, India",
      type: "Renewable Energy",
      cost: "₹500 per tonne CO2",
      verification: "Gold Standard",
      impact: "Provides clean energy to 50,000 households",
      available: 5000
    },
    {
      name: "Forest Conservation",
      location: "Western Ghats, India",
      type: "Forest Protection",
      cost: "₹450 per tonne CO2",
      verification: "VCS",
      impact: "Protects 10,000 hectares of forest",
      available: 3000
    }
  ];
};

export default {
  calculateCarbonFootprint,
  getEcoTips,
  getHeritageData,
  calculateSustainabilityScore,
  getSustainabilityRecommendations,
  getSuccessStories,
  getCarbonOffsetProjects
};

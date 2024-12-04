import React, { useState, useEffect } from 'react';
import { Leaf, Truck, Factory, Package, Globe, Info, ArrowUp, ArrowDown, AlertTriangle } from 'lucide-react';
import { calculateCarbonFootprint, getEcoTips, calculateSustainabilityScore, getSustainabilityRecommendations } from '../api/carbon';

const CarbonQuest = () => {
  const [period, setPeriod] = useState('month');
  const [carbonData, setCarbonData] = useState(null);
  const [ecoTips, setEcoTips] = useState({});
  const [sustainabilityScore, setSustainabilityScore] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchData = async () => {
      const [carbon, tips, score, recs] = await Promise.all([
        calculateCarbonFootprint(period),
        getEcoTips('all'),
        calculateSustainabilityScore(),
        getSustainabilityRecommendations()
      ]);
      setCarbonData(carbon);
      setEcoTips(tips);
      setSustainabilityScore(score);
      setRecommendations(recs);
    };
    fetchData();
  }, [period]);

  const getTrendIcon = (trend) => {
    const value = parseFloat(trend);
    if (value > 0) return <ArrowUp className="h-4 w-4 text-red-500" />;
    if (value < 0) return <ArrowDown className="h-4 w-4 text-green-500" />;
    return null;
  };

  if (!carbonData || !sustainabilityScore || !recommendations) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F1111] mb-2">Sustainability Dashboard</h1>
        <p className="text-[#565959]">Track and improve your business's environmental impact</p>
      </div>

      {/* Period Selector */}
      <div className="mb-6">
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="bg-white border border-gray-300 rounded-md px-4 py-2"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex space-x-8">
          {['overview', 'details', 'recommendations'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 ${
                activeTab === tab
                  ? 'border-b-2 border-green-500 text-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              } font-medium capitalize`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'overview' && (
        <>
          {/* Overall Score */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">Sustainability Score</h2>
                <div className="flex items-center">
                  <span className="text-4xl font-bold text-green-600">{sustainabilityScore.overall}</span>
                  <span className="text-gray-500 ml-2">/ 100</span>
                </div>
              </div>
              <Leaf className="h-12 w-12 text-green-500" />
            </div>
          </div>

          {/* Carbon Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#565959]">Shipping Emissions</p>
                  <div className="flex items-center">
                    <p className="text-2xl font-semibold text-[#0F1111]">{carbonData.shipping.value}</p>
                    <span className="ml-2 text-sm">CO₂e</span>
                    {getTrendIcon(carbonData.shipping.trend)}
                  </div>
                </div>
                <Truck className="h-8 w-8 text-blue-500" />
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#565959]">Packaging Impact</p>
                  <div className="flex items-center">
                    <p className="text-2xl font-semibold text-[#0F1111]">{carbonData.packaging.value}</p>
                    <span className="ml-2 text-sm">CO₂e</span>
                    {getTrendIcon(carbonData.packaging.trend)}
                  </div>
                </div>
                <Package className="h-8 w-8 text-green-500" />
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#565959]">Warehouse Operations</p>
                  <div className="flex items-center">
                    <p className="text-2xl font-semibold text-[#0F1111]">{carbonData.warehousing.value}</p>
                    <span className="ml-2 text-sm">CO₂e</span>
                    {getTrendIcon(carbonData.warehousing.trend)}
                  </div>
                </div>
                <Factory className="h-8 w-8 text-orange-500" />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Immediate Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendations.immediate.map((action, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">{action.title}</h4>
                  <div className="flex space-x-4 text-sm">
                    <span className="text-green-600">Impact: {action.impact}</span>
                    <span className="text-gray-500">Cost: {action.cost}</span>
                    <span className="text-blue-500">{action.timeframe}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {activeTab === 'details' && (
        <div className="space-y-6">
          {/* Detailed Breakdowns */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Detailed Analysis</h3>
            <div className="space-y-6">
              {Object.entries(carbonData).map(([key, data]) => {
                if (key === 'total') return null;
                return (
                  <div key={key} className="border-b pb-4">
                    <h4 className="font-medium mb-2 capitalize">{key} Breakdown</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {Object.entries(data.breakdown).map(([subKey, value]) => (
                        <div key={subKey} className="bg-gray-50 p-3 rounded">
                          <p className="text-sm text-gray-500 capitalize">{subKey}</p>
                          <p className="text-lg font-semibold">{value} CO₂e</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'recommendations' && (
        <div className="space-y-6">
          {/* Timeline based recommendations */}
          {['immediate', 'shortTerm', 'longTerm'].map((timeframe) => (
            <div key={timeframe} className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 capitalize">
                {timeframe.replace(/([A-Z])/g, ' $1').trim()} Actions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendations[timeframe].map((action, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">{action.title}</h4>
                    <div className="flex flex-wrap gap-3 text-sm">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                        Impact: {action.impact}
                      </span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        Cost: {action.cost}
                      </span>
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                        {action.timeframe}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarbonQuest;

import React, { useState, useEffect } from 'react';
import { predictShippingDelay, classifyDocument, optimizePricing } from '../utils/mlUtils';
import { AlertTriangle, FileText, DollarSign, ChevronDown, ChevronUp } from 'lucide-react';

const InsightCard = ({ icon: Icon, title, children, defaultExpanded = true }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="bg-white rounded-lg shadow mb-4">
      <div 
        className="p-3 flex items-center justify-between cursor-pointer hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-2">
          <Icon className={`w-5 h-5 ${
            title.includes('Delay') ? 'text-yellow-500' :
            title.includes('Document') ? 'text-blue-500' :
            'text-green-500'
          }`} />
          <h3 className="text-sm font-semibold">{title}</h3>
        </div>
        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </div>
      {isExpanded && (
        <div className="p-3 pt-0">
          {children}
        </div>
      )}
    </div>
  );
};

const MLInsights = ({ shipmentData, documentData, productData, marketData }) => {
  const [delayPrediction, setDelayPrediction] = useState(null);
  const [documentClass, setDocumentClass] = useState(null);
  const [priceOptimization, setPriceOptimization] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        setLoading(true);
        const [delayData, docData, priceData] = await Promise.all([
          predictShippingDelay(shipmentData),
          documentData ? classifyDocument(documentData) : null,
          productData ? optimizePricing(productData, marketData) : null
        ]);

        setDelayPrediction(delayData);
        setDocumentClass(docData);
        setPriceOptimization(priceData);
      } catch (error) {
        console.error('Error fetching ML insights:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, [shipmentData, documentData, productData, marketData]);

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-200 h-32 rounded-lg"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {delayPrediction && (
        <InsightCard icon={AlertTriangle} title="Shipping Delay Prediction">
          <div className="space-y-2">
            <p className="text-xl font-bold text-yellow-600">
              {delayPrediction.predictedDelay.toFixed(1)} hours
            </p>
            <div className="flex items-center text-xs text-gray-500">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{ width: `${delayPrediction.confidence * 100}%` }}
                ></div>
              </div>
              <span className="ml-2">{(delayPrediction.confidence * 100).toFixed(0)}%</span>
            </div>
            <div className="text-xs">
              <span className="font-medium">Factors: </span>
              {delayPrediction.factors.join(', ')}
            </div>
          </div>
        </InsightCard>
      )}

      {documentClass && (
        <InsightCard icon={FileText} title="Document Classification">
          <div className="space-y-2">
            <p className="text-sm font-medium">
              Type: <span className="text-blue-600">{documentClass.documentType.replace(/_/g, ' ')}</span>
            </p>
            <div className="flex items-center text-xs text-gray-500">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${documentClass.confidence * 100}%` }}
                ></div>
              </div>
              <span className="ml-2">{(documentClass.confidence * 100).toFixed(0)}%</span>
            </div>
            <p className="text-xs">
              Category: {documentClass.suggestedCategory}
            </p>
          </div>
        </InsightCard>
      )}

      {priceOptimization && (
        <InsightCard icon={DollarSign} title="Price Optimization">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xl font-bold text-green-600">
                ${priceOptimization.suggestedPrice.toFixed(2)}
              </p>
              <span className="text-xs text-gray-500">
                Margin: {(priceOptimization.profitMargin * 100).toFixed(1)}%
              </span>
            </div>
            <div className="text-xs space-y-1">
              <div>Range: ${priceOptimization.priceRange.min.toFixed(2)} - ${priceOptimization.priceRange.max.toFixed(2)}</div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">Position:</span>
                <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full">
                  {priceOptimization.competitiveAnalysis.marketPosition}
                </span>
              </div>
            </div>
          </div>
        </InsightCard>
      )}
    </div>
  );
};

export default MLInsights;

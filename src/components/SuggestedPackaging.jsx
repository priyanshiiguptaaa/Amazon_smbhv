import React from 'react';
import { Package, Leaf, Info } from 'lucide-react';

const SuggestedPackaging = ({ product }) => {
  // Mock function to calculate suggested packaging based on product dimensions and weight
  const getSuggestedPackaging = (product) => {
    const { weight, dimensions } = product;
    
    // Mock suggestions based on product attributes
    const suggestions = [
      {
        type: 'Eco-Friendly Box',
        dimensions: '30x20x15 cm',
        material: 'Recycled Cardboard',
        sustainability: 'High',
        co2Reduction: '75%',
        isRecommended: true,
      },
      {
        type: 'Standard Box',
        dimensions: '35x25x20 cm',
        material: 'Cardboard',
        sustainability: 'Medium',
        co2Reduction: '45%',
        isRecommended: false,
      },
      {
        type: 'Padded Envelope',
        dimensions: '40x30 cm',
        material: 'Recycled Paper',
        sustainability: 'High',
        co2Reduction: '65%',
        isRecommended: false,
      }
    ];

    return suggestions;
  };

  const suggestions = getSuggestedPackaging(product);

  return (
    <div className="mt-4 bg-white rounded-lg shadow p-4">
      <div className="flex items-center mb-4">
        <Package className="h-5 w-5 text-[#FF9900] mr-2" />
        <h3 className="text-lg font-medium text-[#0F1111]">Suggested Packaging</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {suggestions.map((suggestion, index) => (
          <div 
            key={index}
            className={`border rounded-lg p-4 ${
              suggestion.isRecommended 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-200'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium text-[#0F1111] flex items-center">
                  {suggestion.type}
                  {suggestion.isRecommended && (
                    <span className="ml-2 text-xs bg-green-600 text-white px-2 py-0.5 rounded-full">
                      Recommended
                    </span>
                  )}
                </h4>
                <p className="text-sm text-[#565959] mt-1">
                  {suggestion.dimensions}
                </p>
              </div>
              {suggestion.sustainability === 'High' && (
                <Leaf className="h-5 w-5 text-green-500" />
              )}
            </div>
            
            <div className="mt-3 space-y-2">
              <div className="flex items-center text-sm">
                <span className="text-[#565959]">Material:</span>
                <span className="ml-2 text-[#0F1111]">{suggestion.material}</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-[#565959]">CO₂ Reduction:</span>
                <span className="ml-2 text-green-600">{suggestion.co2Reduction}</span>
              </div>
            </div>

            {suggestion.isRecommended && (
              <div className="mt-3 flex items-start bg-green-100 rounded p-2 text-xs text-green-800">
                <Info className="h-4 w-4 mr-1 flex-shrink-0 mt-0.5" />
                <p>Best match for product dimensions and sustainability goals</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedPackaging;

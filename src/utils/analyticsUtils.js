export const analyzeShippingCosts = (shipments) => {
  const analysis = shipments.reduce((acc, shipment) => {
    const carrier = shipment.carrier;
    if (!acc[carrier]) {
      acc[carrier] = {
        totalCost: 0,
        count: 0,
        avgDeliveryTime: 0,
        delays: 0
      };
    }
    
    acc[carrier].totalCost += shipment.cost;
    acc[carrier].count += 1;
    acc[carrier].avgDeliveryTime += shipment.deliveryTime;
    if (shipment.delayed) acc[carrier].delays += 1;
    
    return acc;
  }, {});

  // Calculate averages and metrics
  Object.keys(analysis).forEach(carrier => {
    const stats = analysis[carrier];
    stats.avgCost = stats.totalCost / stats.count;
    stats.avgDeliveryTime = stats.avgDeliveryTime / stats.count;
    stats.delayRate = (stats.delays / stats.count) * 100;
  });

  return analysis;
};

export const getCarrierPerformance = (shipments) => {
  const performance = analyzeShippingCosts(shipments);
  return Object.entries(performance).map(([carrier, stats]) => ({
    carrier,
    metrics: {
      costEfficiency: calculateCostEfficiency(stats.avgCost),
      deliverySpeed: calculateDeliverySpeed(stats.avgDeliveryTime),
      reliability: 100 - stats.delayRate
    }
  }));
};

export const getMarketTrends = (orders, timeframe = 'monthly') => {
  const trends = orders.reduce((acc, order) => {
    const date = new Date(order.date);
    const key = timeframe === 'monthly' 
      ? `${date.getFullYear()}-${date.getMonth() + 1}`
      : `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    
    if (!acc[key]) {
      acc[key] = {
        totalOrders: 0,
        totalValue: 0,
        destinations: {}
      };
    }
    
    acc[key].totalOrders += 1;
    acc[key].totalValue += order.value;
    acc[key].destinations[order.destination] = (acc[key].destinations[order.destination] || 0) + 1;
    
    return acc;
  }, {});

  return Object.entries(trends).map(([period, data]) => ({
    period,
    ...data,
    topDestinations: Object.entries(data.destinations)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([country, count]) => ({ country, count }))
  }));
};

// Helper functions
const calculateCostEfficiency = (avgCost) => {
  // Lower cost = higher efficiency, scale from 0-100
  const maxCost = 1000; // Example threshold
  return Math.max(0, 100 - (avgCost / maxCost * 100));
};

const calculateDeliverySpeed = (avgTime) => {
  // Lower time = higher speed score, scale from 0-100
  const maxTime = 10; // Example threshold in days
  return Math.max(0, 100 - (avgTime / maxTime * 100));
};

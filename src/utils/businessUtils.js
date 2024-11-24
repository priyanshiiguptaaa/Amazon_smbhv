// Mock exchange rates (in production, use real-time forex API)
const exchangeRates = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.73,
  INR: 83.20,
  JPY: 110.5
};

export const generateInvoice = async (order) => {
  const invoice = {
    invoiceNumber: `INV-${Date.now()}`,
    date: new Date().toISOString(),
    order: order.id,
    items: order.items.map(item => ({
      ...item,
      total: item.quantity * item.price
    })),
    subtotal: order.items.reduce((sum, item) => sum + (item.quantity * item.price), 0),
    tax: 0.1, // 10% tax rate
    shipping: order.shippingCost || 0,
    currency: order.currency || 'USD'
  };

  invoice.total = invoice.subtotal * (1 + invoice.tax) + invoice.shipping;
  
  return {
    ...invoice,
    pdfUrl: `https://api.cargoconnect.com/invoices/${invoice.invoiceNumber}.pdf`
  };
};

export const trackPayment = async (paymentId) => {
  // Simulate payment tracking
  const statuses = ['pending', 'processing', 'completed', 'failed'];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  
  return {
    paymentId,
    status: randomStatus,
    amount: Math.random() * 10000,
    currency: 'USD',
    lastUpdated: new Date().toISOString()
  };
};

export const convertCurrency = (amount, fromCurrency, toCurrency) => {
  if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
    throw new Error('Invalid currency');
  }

  const inUSD = amount / exchangeRates[fromCurrency];
  return inUSD * exchangeRates[toCurrency];
};

export const getPaymentAnalytics = async (payments, timeframe = 'monthly') => {
  const analytics = payments.reduce((acc, payment) => {
    const date = new Date(payment.date);
    const key = timeframe === 'monthly' 
      ? `${date.getFullYear()}-${date.getMonth() + 1}`
      : `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    
    if (!acc[key]) {
      acc[key] = {
        totalAmount: 0,
        count: 0,
        successful: 0,
        failed: 0
      };
    }
    
    acc[key].totalAmount += payment.amount;
    acc[key].count += 1;
    if (payment.status === 'completed') acc[key].successful += 1;
    if (payment.status === 'failed') acc[key].failed += 1;
    
    return acc;
  }, {});

  return Object.entries(analytics).map(([period, data]) => ({
    period,
    ...data,
    successRate: (data.successful / data.count) * 100
  }));
};

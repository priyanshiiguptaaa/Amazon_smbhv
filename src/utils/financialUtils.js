import axios from 'axios';

// Cache for exchange rates
let ratesCache = {
  rates: null,
  timestamp: null,
  CACHE_DURATION: 1000 * 60 * 60 // 1 hour
};

// Currency Conversion
export const convertCurrency = async (amount, fromCurrency, toCurrency) => {
  try {
    // Check if we need to fetch new rates
    const now = Date.now();
    if (!ratesCache.rates || !ratesCache.timestamp || (now - ratesCache.timestamp > ratesCache.CACHE_DURATION)) {
      const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/USD`);
      ratesCache.rates = response.data.rates;
      ratesCache.timestamp = now;
    }

    // Convert both currencies through USD as base
    const fromRate = fromCurrency === 'USD' ? 1 : ratesCache.rates[fromCurrency];
    const toRate = toCurrency === 'USD' ? 1 : ratesCache.rates[toCurrency];
    
    if (!fromRate || !toRate) {
      throw new Error(`Invalid currency code: ${!fromRate ? fromCurrency : toCurrency}`);
    }

    const convertedAmount = (amount / fromRate) * toRate;

    return {
      originalAmount: amount,
      originalCurrency: fromCurrency,
      convertedAmount: Number(convertedAmount.toFixed(2)),
      targetCurrency: toCurrency,
      exchangeRate: Number((toRate / fromRate).toFixed(6)),
      timestamp: new Date().toISOString(),
      isLive: true
    };
  } catch (error) {
    console.error('Error converting currency:', error);
    
    // Fallback to static rates if API fails
    const fallbackRates = {
      USD: 1,
      EUR: 0.85,
      GBP: 0.73,
      INR: 83.20,
      AED: 3.67
    };

    const fromRate = fallbackRates[fromCurrency];
    const toRate = fallbackRates[toCurrency];
    const convertedAmount = (amount / fromRate) * toRate;

    return {
      originalAmount: amount,
      originalCurrency: fromCurrency,
      convertedAmount: Number(convertedAmount.toFixed(2)),
      targetCurrency: toCurrency,
      exchangeRate: Number((toRate / fromRate).toFixed(6)),
      timestamp: new Date().toISOString(),
      isLive: false
    };
  }
};

// Tax Calculator
export const calculateTaxes = async (shipment) => {
  try {
    // Mock tax calculation (replace with actual tax rules)
    const baseValue = shipment.value;
    const countryRates = {
      US: { duty: 0.05, gst: 0 },
      EU: { duty: 0.03, vat: 0.20 },
      UK: { duty: 0.04, vat: 0.20 },
      UAE: { duty: 0.05, vat: 0.05 }
    };

    const rates = countryRates[shipment.destination];
    const dutyAmount = baseValue * rates.duty;
    const vatAmount = (baseValue + dutyAmount) * (rates.vat || 0);

    return {
      baseValue: baseValue,
      dutyRate: rates.duty,
      dutyAmount: dutyAmount,
      vatRate: rates.vat || 0,
      vatAmount: vatAmount,
      totalTaxes: dutyAmount + vatAmount,
      totalCost: baseValue + dutyAmount + vatAmount,
      breakdown: [
        { type: 'Base Value', amount: baseValue },
        { type: 'Import Duty', amount: dutyAmount },
        { type: 'VAT/GST', amount: vatAmount }
      ]
    };
  } catch (error) {
    console.error('Error calculating taxes:', error);
    throw error;
  }
};

// Payment Processing
export const processPayment = async (paymentDetails) => {
  try {
    // Mock payment processing (replace with actual payment gateway)
    return {
      transactionId: 'TXN' + Date.now(),
      status: 'success',
      amount: paymentDetails.amount,
      currency: paymentDetails.currency,
      paymentMethod: paymentDetails.method,
      timestamp: new Date().toISOString(),
      fees: paymentDetails.amount * 0.029 + 0.30,
      settlementDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString()
    };
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error;
  }
};

// Financial Reports
export const generateFinancialReport = async (companyId, startDate, endDate) => {
  try {
    return {
      period: { start: startDate, end: endDate },
      summary: {
        totalRevenue: 250000,
        totalCosts: 175000,
        grossProfit: 75000,
        netProfit: 52500
      },
      revenueBreakdown: {
        byProduct: [
          { product: 'Mangoes', revenue: 100000 },
          { product: 'Pomegranates', revenue: 80000 },
          { product: 'Papayas', revenue: 70000 }
        ],
        byRegion: [
          { region: 'Europe', revenue: 120000 },
          { region: 'Middle East', revenue: 80000 },
          { region: 'North America', revenue: 50000 }
        ]
      },
      costBreakdown: {
        shipping: 80000,
        packaging: 30000,
        customs: 25000,
        operations: 40000
      },
      metrics: {
        profitMargin: 21,
        operatingExpenseRatio: 16,
        returnOnInvestment: 24
      },
      trends: [
        {
          month: 'October',
          revenue: 85000,
          costs: 60000,
          profit: 25000
        },
        {
          month: 'November',
          revenue: 78000,
          costs: 55000,
          profit: 23000
        },
        {
          month: 'December',
          revenue: 87000,
          costs: 60000,
          profit: 27000
        }
      ]
    };
  } catch (error) {
    console.error('Error generating financial report:', error);
    throw error;
  }
};

// Credit Management
export const manageCreditLine = async (companyId) => {
  try {
    return {
      creditLimit: 100000,
      currentUtilization: 45000,
      availableCredit: 55000,
      paymentHistory: {
        onTimePayments: 95,
        averagePaymentTime: 28,
        creditScore: 750
      },
      activeLoans: [
        {
          id: 'LOAN-2023-001',
          amount: 30000,
          interestRate: 0.08,
          remainingBalance: 25000,
          nextPaymentDate: '2023-11-15'
        }
      ],
      recommendations: [
        'Eligible for credit limit increase',
        'Consider early payment discounts',
        'Refinancing options available'
      ]
    };
  } catch (error) {
    console.error('Error managing credit line:', error);
    throw error;
  }
};

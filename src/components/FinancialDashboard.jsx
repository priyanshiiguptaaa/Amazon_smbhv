import React, { useState, useEffect } from 'react';
import {
  convertCurrency,
  calculateTaxes,
  generateFinancialReport,
  manageCreditLine
} from '../utils/financialUtils';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  PieChart as PieChartIcon,
  Calendar,
  AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const FinancialDashboard = ({ companyId }) => {
  const [financialData, setFinancialData] = useState(null);
  const [creditData, setCreditData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [financial, credit] = await Promise.all([
          generateFinancialReport(companyId, dateRange.start, dateRange.end),
          manageCreditLine(companyId)
        ]);

        setFinancialData(financial);
        setCreditData(credit);
      } catch (error) {
        console.error('Error fetching financial data:', error);
        toast.error('Failed to load financial data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [companyId, dateRange]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-2">
            <DollarSign className="text-blue-500" />
            <h3 className="text-lg font-semibold">Revenue</h3>
          </div>
          <p className="text-2xl font-bold mt-2">
            ${financialData?.summary.totalRevenue.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">
            {dateRange.start} to {dateRange.end}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="text-blue-500" />
            <h3 className="text-lg font-semibold">Profit Margin</h3>
          </div>
          <p className="text-2xl font-bold mt-2">{financialData?.metrics.profitMargin}%</p>
          <p className="text-sm text-gray-500">Net Profit Ratio</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-2">
            <CreditCard className="text-blue-500" />
            <h3 className="text-lg font-semibold">Credit Available</h3>
          </div>
          <p className="text-2xl font-bold mt-2">
            ${creditData?.availableCredit.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">
            Limit: ${creditData?.creditLimit.toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="text-blue-500" />
            <h3 className="text-lg font-semibold">Payment Score</h3>
          </div>
          <p className="text-2xl font-bold mt-2">{creditData?.paymentHistory.creditScore}</p>
          <p className="text-sm text-gray-500">
            {creditData?.paymentHistory.onTimePayments}% On-time
          </p>
        </div>
      </div>

      {/* Revenue Trends */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-4">Revenue Trends</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={financialData?.trends}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#2563eb"
                name="Revenue"
              />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="#10b981"
                name="Profit"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-4">Revenue by Product</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={financialData?.revenueBreakdown.byProduct}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="revenue"
                  nameKey="product"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {financialData?.revenueBreakdown.byProduct.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-4">Revenue by Region</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={financialData?.revenueBreakdown.byRegion}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#2563eb" name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-4">Cost Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(financialData?.costBreakdown || {}).map(([key, value]) => (
            <div key={key} className="p-4 border rounded-lg">
              <h4 className="text-sm font-semibold capitalize">{key}</h4>
              <p className="text-2xl font-bold mt-1">${value.toLocaleString()}</p>
              <p className="text-sm text-gray-500">
                {((value / financialData?.summary.totalCosts) * 100).toFixed(1)}% of total
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Credit Management */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-4">Credit Management</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2">Active Loans</h4>
            {creditData?.activeLoans.map((loan, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 mb-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold">{loan.id}</p>
                  <p className="text-blue-500 font-bold">
                    ${loan.remainingBalance.toLocaleString()}
                  </p>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Interest Rate: {(loan.interestRate * 100).toFixed(1)}%</p>
                  <p>Next Payment: {new Date(loan.nextPaymentDate).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <h4 className="font-semibold mb-2">Recommendations</h4>
            <ul className="space-y-2">
              {creditData?.recommendations.map((rec, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-2 text-gray-600"
                >
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialDashboard;

import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { TrendingUp, DollarSign, Package, FileText } from 'lucide-react';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const StatCard = ({ title, value, change, icon: Icon }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-[#565959]">{title}</p>
        <h3 className="mt-2 text-3xl font-semibold text-[#0F1111]">{value}</h3>
      </div>
      <div className="p-3 bg-[#EAEDED] rounded-full">
        <Icon className="h-6 w-6 text-[#FF9900]" />
      </div>
    </div>
    <div className="mt-4">
      <span className={`text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
      </span>
      <span className="text-sm text-[#565959] ml-2">vs last month</span>
    </div>
  </div>
);

const Analytics = () => {
  // Sample data for charts
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [30000, 35000, 32000, 40000, 45000, 50000],
        borderColor: '#FF9900',
        backgroundColor: 'rgba(255, 153, 0, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const ordersData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Orders',
        data: [120, 150, 140, 160, 180, 200],
        backgroundColor: '#FF9900',
      },
    ],
  };

  const stats = [
    {
      title: 'Total Revenue',
      value: '$245,000',
      change: 18.3,
      icon: DollarSign,
    },
    {
      title: 'Orders',
      value: '1,456',
      change: 12.5,
      icon: Package,
    },
    {
      title: 'Growth Rate',
      value: '24.5%',
      change: 7.2,
      icon: TrendingUp,
    },
    {
      title: 'Documents',
      value: '245',
      change: -4.2,
      icon: FileText,
    },
  ];

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#f3f4f6',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#0F1111]">Analytics Overview</h1>
        <p className="text-[#565959] mt-1">Track your export business performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-[#0F1111] mb-4">Revenue Trend</h2>
          <Line data={revenueData} options={chartOptions} />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-[#0F1111] mb-4">Orders Overview</h2>
          <Bar data={ordersData} options={chartOptions} />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-[#0F1111] mb-4">Top Products</h2>
          <div className="space-y-4">
            {[
              { name: 'Product A', value: '$12,500', growth: 15 },
              { name: 'Product B', value: '$8,300', growth: 10 },
              { name: 'Product C', value: '$6,200', growth: -5 },
            ].map((product) => (
              <div key={product.name} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#0F1111]">{product.name}</p>
                  <p className="text-sm text-[#565959]">{product.value}</p>
                </div>
                <span className={`text-sm ${product.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.growth >= 0 ? '↑' : '↓'} {Math.abs(product.growth)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-[#0F1111] mb-4">Top Markets</h2>
          <div className="space-y-4">
            {[
              { name: 'United States', value: '$85,200', growth: 20 },
              { name: 'Europe', value: '$45,300', growth: 12 },
              { name: 'Asia', value: '$32,100', growth: 8 },
            ].map((market) => (
              <div key={market.name} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#0F1111]">{market.name}</p>
                  <p className="text-sm text-[#565959]">{market.value}</p>
                </div>
                <span className={`text-sm ${market.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {market.growth >= 0 ? '↑' : '↓'} {Math.abs(market.growth)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-[#0F1111] mb-4">Document Status</h2>
          <div className="space-y-4">
            {[
              { name: 'Verified', count: 156, percentage: 75 },
              { name: 'Pending', count: 42, percentage: 20 },
              { name: 'Rejected', count: 8, percentage: 5 },
            ].map((status) => (
              <div key={status.name} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-[#0F1111]">{status.name}</span>
                  <span className="text-sm text-[#565959]">{status.count}</span>
                </div>
                <div className="w-full bg-[#EAEDED] rounded-full h-2">
                  <div
                    className="bg-[#FF9900] h-2 rounded-full"
                    style={{ width: `${status.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { 
  BarChart3, 
  ArrowRight, 
  TrendingUp, 
  Users, 
  MapPin, 
  Award,
  Calendar,
  DollarSign,
  Leaf,
  Eye,
  Download
} from 'lucide-react';
import { TouristData } from '../types';
import { touristData } from '../data/mockData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface DashboardProps {
  onBack: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onBack }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'6m' | '1y' | 'all'>('1y');
  const [selectedMetric, setSelectedMetric] = useState<'visitors' | 'eco-score' | 'revenue'>('visitors');

  // Tourist Inflow Chart Data
  const touristInflowData = {
    labels: touristData.map(data => data.month),
    datasets: [
      {
        label: 'Actual Visitors',
        data: touristData.map(data => data.visitors),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Forecasted Visitors',
        data: touristData.map(data => data.forecast || null),
        borderColor: 'rgb(249, 115, 22)',
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        borderDash: [5, 5],
        tension: 0.4,
        fill: false,
      }
    ],
  };

  // Eco-Score Trends Chart Data
  const ecoScoreData = {
    labels: touristData.filter(data => data.ecoScore > 0).map(data => data.month),
    datasets: [
      {
        label: 'Eco-Score',
        data: touristData.filter(data => data.ecoScore > 0).map(data => data.ecoScore),
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(34, 197, 94, 0.7)',
          'rgba(34, 197, 94, 0.6)',
          'rgba(34, 197, 94, 0.5)',
          'rgba(34, 197, 94, 0.4)',
          'rgba(34, 197, 94, 0.3)',
          'rgba(34, 197, 94, 0.2)',
          'rgba(34, 197, 94, 0.1)',
          'rgba(34, 197, 94, 0.9)',
        ],
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 2,
      },
    ],
  };

  // Destination Popularity Data
  const destinationData = {
    labels: ['Netarhat', 'Betla National Park', 'Hundru Falls', 'Rajrappa Temple', 'Ranchi Lake', 'Tribal Museum'],
    datasets: [
      {
        label: 'Monthly Visitors',
        data: [8500, 12000, 6800, 4200, 5500, 3800],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(249, 115, 22, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(245, 158, 11, 0.8)',
        ],
        borderColor: [
          'rgb(34, 197, 94)',
          'rgb(249, 115, 22)',
          'rgb(59, 130, 246)',
          'rgb(168, 85, 247)',
          'rgb(236, 72, 153)',
          'rgb(245, 158, 11)',
        ],
        borderWidth: 2,
      },
    ],
  };

  // Revenue Distribution Data
  const revenueData = {
    labels: ['Handicrafts', 'Homestays', 'Eco Tours', 'Guide Services', 'Transportation'],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(249, 115, 22, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(245, 158, 11, 0.8)',
        ],
        borderColor: [
          'rgb(34, 197, 94)',
          'rgb(249, 115, 22)',
          'rgb(59, 130, 246)',
          'rgb(168, 85, 247)',
          'rgb(245, 158, 11)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: false,
      },
    },
  };

  const kpiCards = [
    {
      title: 'Total Visitors',
      value: '2.4M+',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Eco-Score Average',
      value: '87.2',
      change: '+3.8%',
      trend: 'up',
      icon: Leaf,
      color: 'bg-green-500'
    },
    {
      title: 'Revenue Generated',
      value: '₹45.6L',
      change: '+18.2%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-cultural-orange-500'
    },
    {
      title: 'Active Destinations',
      value: '156',
      change: '+7',
      trend: 'up',
      icon: MapPin,
      color: 'bg-purple-500'
    }
  ];

  const recentActivities = [
    {
      type: 'booking',
      message: 'New eco-tour booking at Betla National Park',
      time: '2 minutes ago',
      icon: '🌿',
      amount: '+₹4,500'
    },
    {
      type: 'verification',
      message: 'Guide Ravi Kumar verified on blockchain',
      time: '15 minutes ago',
      icon: '🔗',
      amount: null
    },
    {
      type: 'achievement',
      message: 'Tourist earned "Nature Lover" badge',
      time: '1 hour ago',
      icon: '🏆',
      amount: '+50 eco-points'
    },
    {
      type: 'marketplace',
      message: 'Tribal handicraft sold in marketplace',
      time: '2 hours ago',
      icon: '🎨',
      amount: '+₹1,200'
    },
    {
      type: 'safety',
      message: 'Weather alert issued for Netarhat region',
      time: '3 hours ago',
      icon: '⚠️',
      amount: null
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-green-50 via-white to-earth-brown-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-eco-green-600 hover:text-eco-green-700 font-medium"
          >
            <ArrowRight className="w-5 h-5 mr-2 rotate-180" />
            Back to Home
          </button>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-6 h-6 text-eco-green-600" />
              <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
            </div>
            <div className="flex space-x-2">
              <button className="bg-eco-green-500 hover:bg-eco-green-600 text-white px-4 py-2 rounded-xl font-medium transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value as '6m' | '1y' | 'all')}
                className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-eco-green-500 focus:border-transparent"
              >
                <option value="6m">Last 6 Months</option>
                <option value="1y">Last Year</option>
                <option value="all">All Time</option>
              </select>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiCards.map((kpi, index) => {
            const IconComponent = kpi.icon;
            return (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${kpi.color} rounded-xl flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex items-center space-x-1 text-sm ${
                    kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendingUp className={`w-4 h-4 ${kpi.trend === 'down' ? 'rotate-180' : ''}`} />
                    <span>{kpi.change}</span>
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{kpi.value}</div>
                  <div className="text-gray-600 text-sm">{kpi.title}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Charts */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tourist Inflow Chart */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Tourist Inflow Forecast</h2>
                    <p className="text-gray-600">Monthly visitor trends with AI predictions</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-eco-green-100 text-eco-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Actual
                    </button>
                    <button className="bg-cultural-orange-100 text-cultural-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                      Predicted
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="h-80">
                  <Line data={touristInflowData} options={chartOptions} />
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4 pt-6 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-eco-green-600">32K</div>
                    <div className="text-sm text-gray-600">Next Month Forecast</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cultural-orange-600">+15%</div>
                    <div className="text-sm text-gray-600">Growth Prediction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">94%</div>
                    <div className="text-sm text-gray-600">Forecast Accuracy</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Eco-Score Trends */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Eco-Score Trends</h2>
                    <p className="text-gray-600">Monthly sustainability performance</p>
                  </div>
                  <div className="flex items-center space-x-2 text-green-600">
                    <Award className="w-5 h-5" />
                    <span className="font-semibold">Excellent Performance</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="h-80">
                  <Bar data={ecoScoreData} options={chartOptions} />
                </div>
                <div className="mt-6 bg-green-50 p-4 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-green-800">Sustainability Impact</div>
                      <div className="text-sm text-green-600">Your platform is making a difference!</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">91.2</div>
                      <div className="text-sm text-green-600">Average Eco-Score</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Destination Popularity */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold text-gray-900">Popular Destinations</h2>
                <p className="text-gray-600">Monthly visitor distribution by location</p>
              </div>
              <div className="p-6">
                <div className="h-80">
                  <Bar data={destinationData} options={chartOptions} />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Revenue Distribution */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="text-xl font-bold text-gray-900">Revenue Sources</h3>
                <p className="text-gray-600">Income distribution by category</p>
              </div>
              <div className="p-6">
                <div className="h-64">
                  <Doughnut data={revenueData} options={doughnutOptions} />
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Revenue</span>
                    <span className="font-semibold">₹45.6L</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Monthly Growth</span>
                    <span className="font-semibold text-green-600">+18.2%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Real-time Activity */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">Live Activity</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">Live</span>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-eco-green-100 rounded-full flex items-center justify-center text-lg flex-shrink-0">
                      {activity.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900">{activity.message}</div>
                      <div className="text-xs text-gray-600">{activity.time}</div>
                    </div>
                    {activity.amount && (
                      <div className="text-sm font-semibold text-eco-green-600">
                        {activity.amount}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-r from-eco-green-500 to-cultural-orange-500 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Platform Health</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>System Uptime</span>
                  <span className="font-semibold">99.9%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Active Users</span>
                  <span className="font-semibold">1,247</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Verified Guides</span>
                  <span className="font-semibold">3/4</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Avg Response Time</span>
                  <span className="font-semibold">127ms</span>
                </div>
              </div>
            </div>

            {/* Predictive Insights */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="text-xl font-bold text-gray-900">AI Insights</h3>
                <p className="text-gray-600">Predictive analytics & recommendations</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-blue-900">Peak Season Alert</span>
                  </div>
                  <p className="text-sm text-blue-800">
                    Tourist influx expected to increase by 25% in the next 2 months. 
                    Consider promoting eco-tours during this period.
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <Leaf className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-900">Eco-Score Boost</span>
                  </div>
                  <p className="text-sm text-green-800">
                    Promoting more homestays could increase your platform's 
                    overall eco-score by 8 points.
                  </p>
                </div>
                <div className="bg-cultural-orange-50 p-4 rounded-xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <Award className="w-5 h-5 text-cultural-orange-600" />
                    <span className="font-semibold text-cultural-orange-900">New Opportunity</span>
                  </div>
                  <p className="text-sm text-cultural-orange-800">
                    Consider adding Palamau Tiger Reserve as a new destination. 
                    High demand detected.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

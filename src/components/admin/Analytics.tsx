import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  Download,
  Calendar,
  Filter,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Analytics: React.FC = () => {
  const [dateRange, setDateRange] = useState("7d");
  const [selectedMetric, setSelectedMetric] = useState("revenue");

  // Mock data - replace with actual API calls
  const performanceData = [
    {
      date: "2024-01-01",
      revenue: 125000,
      users: 45,
      transactions: 120,
      success_rate: 98.5,
    },
    {
      date: "2024-01-02",
      revenue: 142000,
      users: 52,
      transactions: 135,
      success_rate: 97.8,
    },
    {
      date: "2024-01-03",
      revenue: 138000,
      users: 48,
      transactions: 128,
      success_rate: 98.9,
    },
    {
      date: "2024-01-04",
      revenue: 165000,
      users: 61,
      transactions: 152,
      success_rate: 99.1,
    },
    {
      date: "2024-01-05",
      revenue: 178000,
      users: 67,
      transactions: 168,
      success_rate: 98.7,
    },
    {
      date: "2024-01-06",
      revenue: 195000,
      users: 73,
      transactions: 185,
      success_rate: 99.3,
    },
    {
      date: "2024-01-07",
      revenue: 210000,
      users: 78,
      transactions: 198,
      success_rate: 98.9,
    },
  ];

  const serviceAnalytics = [
    {
      service: "MTN Airtime",
      revenue: 450000,
      transactions: 1250,
      growth: 12.5,
    },
    { service: "GLO Data", revenue: 380000, transactions: 980, growth: 8.3 },
    {
      service: "Airtel Airtime",
      revenue: 320000,
      transactions: 850,
      growth: 15.2,
    },
    { service: "PHCN Bills", revenue: 280000, transactions: 420, growth: 22.1 },
    {
      service: "9Mobile Data",
      revenue: 180000,
      transactions: 520,
      growth: 5.8,
    },
    {
      service: "DSTV Subscription",
      revenue: 150000,
      transactions: 180,
      growth: 18.7,
    },
  ];

  const userGrowthData = [
    { month: "Jan", new_users: 125, active_users: 890, retention: 85.2 },
    { month: "Feb", new_users: 142, active_users: 1020, retention: 87.1 },
    { month: "Mar", new_users: 158, active_users: 1150, retention: 86.8 },
    { month: "Apr", new_users: 175, active_users: 1280, retention: 88.5 },
    { month: "May", new_users: 192, active_users: 1420, retention: 89.2 },
    { month: "Jun", new_users: 208, active_users: 1580, retention: 90.1 },
    { month: "Jul", new_users: 225, active_users: 1750, retention: 91.3 },
  ];

  const regionData = [
    { name: "Lagos", value: 35, color: "#13070C" },
    { name: "Abuja", value: 22, color: "#d946ef" },
    { name: "Kano", value: 18, color: "#22c55e" },
    { name: "Port Harcourt", value: 12, color: "#f59e0b" },
    { name: "Ibadan", value: 8, color: "#ef4444" },
    { name: "Others", value: 5, color: "#64748b" },
  ];

  const exportData = () => {
    // Implement CSV export functionality
    console.log("Exporting analytics data...");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-ginto font-bold text-neutral-900">
            Analytics Dashboard
          </h1>
          <p className="text-neutral-600 mt-1">
            Comprehensive insights into your VTU platform
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 bg-white border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 3 months</option>
            <option value="1y">Last year</option>
          </select>
          <button
            onClick={exportData}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Total Revenue",
            value: "₦2,847,500",
            change: "+12.5%",
            icon: DollarSign,
            color: "success",
          },
          {
            title: "New Users",
            value: "225",
            change: "+8.2%",
            icon: Users,
            color: "primary",
          },
          {
            title: "Transactions",
            value: "8,432",
            change: "+15.3%",
            icon: Activity,
            color: "accent",
          },
          {
            title: "Success Rate",
            value: "98.9%",
            change: "+0.5%",
            icon: TrendingUp,
            color: "info",
          },
        ].map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="stats-card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">
                  {metric.title}
                </p>
                <p className="text-2xl font-ginto font-bold text-neutral-900 mt-1">
                  {metric.value}
                </p>
                <p className="text-sm text-success-600 font-medium mt-1">
                  {metric.change}
                </p>
              </div>
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  metric.color === "success"
                    ? "bg-success-500"
                    : metric.color === "primary"
                    ? "bg-primary-500"
                    : metric.color === "accent"
                    ? "bg-accent-500"
                    : "bg-info-500"
                } text-white`}
              >
                <metric.icon className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Performance Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="chart-container"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
          <h3 className="text-lg font-ginto font-semibold text-neutral-900">
            Performance Overview
          </h3>
          <div className="flex items-center space-x-2">
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="revenue">Revenue</option>
              <option value="users">New Users</option>
              <option value="transactions">Transactions</option>
              <option value="success_rate">Success Rate</option>
            </select>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={performanceData}>
            <defs>
              <linearGradient
                id="performanceGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#13070C" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#13070C" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis
              dataKey="date"
              stroke="#64748b"
              fontSize={12}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <YAxis stroke="#64748b" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
              labelFormatter={(value) => new Date(value).toLocaleDateString()}
            />
            <Area
              type="monotone"
              dataKey={selectedMetric}
              stroke="#13070C"
              fillOpacity={1}
              fill="url(#performanceGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Service Analytics and User Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Performance */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="chart-container"
        >
          <h3 className="text-lg font-ginto font-semibold text-neutral-900 mb-6">
            Service Performance
          </h3>
          <div className="space-y-4">
            {serviceAnalytics.map((service, index) => (
              <div
                key={service.service}
                className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl"
              >
                <div className="flex-1">
                  <p className="font-medium text-neutral-900">
                    {service.service}
                  </p>
                  <p className="text-sm text-neutral-600">
                    ₦{service.revenue.toLocaleString()} • {service.transactions}{" "}
                    transactions
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-success-600">
                    +{service.growth}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* User Growth */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="chart-container"
        >
          <h3 className="text-lg font-ginto font-semibold text-neutral-900 mb-6">
            User Growth
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Bar dataKey="new_users" fill="#13070C" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Regional Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="chart-container"
      >
        <h3 className="text-lg font-ginto font-semibold text-neutral-900 mb-6">
          Regional Distribution
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={regionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {regionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            {regionData.map((region) => (
              <div
                key={region.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: region.color }}
                  ></div>
                  <span className="font-medium text-neutral-900">
                    {region.name}
                  </span>
                </div>
                <span className="text-neutral-600">{region.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;

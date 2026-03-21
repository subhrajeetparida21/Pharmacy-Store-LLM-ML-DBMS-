import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from 'recharts';
import './Analytics.css';

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('weekly');
  const [salesData, setSalesData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    // Load sales data based on time range
    loadSalesData();
    loadTopProducts();
    loadCategoryData();
  }, [timeRange]);

  const loadSalesData = () => {
    const data = {
      weekly: [
        { day: 'Mon', sales: 12500, orders: 45 },
        { day: 'Tue', sales: 14800, orders: 52 },
        { day: 'Wed', sales: 13200, orders: 48 },
        { day: 'Thu', sales: 16700, orders: 58 },
        { day: 'Fri', sales: 18900, orders: 65 },
        { day: 'Sat', sales: 15600, orders: 54 },
        { day: 'Sun', sales: 11200, orders: 38 },
      ],
      monthly: [
        { month: 'Week 1', sales: 98500, orders: 342 },
        { month: 'Week 2', sales: 102500, orders: 365 },
        { month: 'Week 3', sales: 112800, orders: 389 },
        { month: 'Week 4', sales: 108900, orders: 376 },
      ],
      yearly: [
        { month: 'Jan', sales: 425000, orders: 1450 },
        { month: 'Feb', sales: 398000, orders: 1380 },
        { month: 'Mar', sales: 452000, orders: 1560 },
        { month: 'Apr', sales: 478000, orders: 1640 },
        { month: 'May', sales: 512000, orders: 1780 },
        { month: 'Jun', sales: 489000, orders: 1690 },
      ],
    };
    setSalesData(data[timeRange] || data.weekly);
  };

  const loadTopProducts = () => {
    const products = [
      { name: 'Paracetamol', sales: 12450, quantity: 2450 },
      { name: 'Ibuprofen', sales: 9850, quantity: 1890 },
      { name: 'Vitamin C', sales: 8760, quantity: 2340 },
      { name: 'Cough Syrup', sales: 6540, quantity: 980 },
      { name: 'Antibiotic', sales: 5430, quantity: 760 },
    ];
    setTopProducts(products);
  };

  const loadCategoryData = () => {
    const data = [
      { name: 'Pain Relief', value: 35 },
      { name: 'Vitamins', value: 25 },
      { name: 'Antibiotics', value: 20 },
      { name: 'Cough & Cold', value: 12 },
      { name: 'Other', value: 8 },
    ];
    setCategoryData(data);
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const stats = {
    totalSales: salesData.reduce((sum, item) => sum + item.sales, 0),
    totalOrders: salesData.reduce((sum, item) => sum + (item.orders || 0), 0),
    averageOrderValue: salesData.reduce((sum, item) => sum + item.sales, 0) / 
                       salesData.reduce((sum, item) => sum + (item.orders || 0), 0) || 0,
  };

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h1>📊 Analytics Dashboard</h1>
        <div className="time-range-selector">
          <button 
            className={timeRange === 'weekly' ? 'active' : ''} 
            onClick={() => setTimeRange('weekly')}
          >
            Weekly
          </button>
          <button 
            className={timeRange === 'monthly' ? 'active' : ''} 
            onClick={() => setTimeRange('monthly')}
          >
            Monthly
          </button>
          <button 
            className={timeRange === 'yearly' ? 'active' : ''} 
            onClick={() => setTimeRange('yearly')}
          >
            Yearly
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>Total Sales</h3>
            <p className="stat-value">{formatCurrency(stats.totalSales)}</p>
            <span className="stat-change positive">+12.5%</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <h3>Total Orders</h3>
            <p className="stat-value">{stats.totalOrders}</p>
            <span className="stat-change positive">+8.3%</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💳</div>
          <div className="stat-info">
            <h3>Avg Order Value</h3>
            <p className="stat-value">{formatCurrency(stats.averageOrderValue)}</p>
            <span className="stat-change positive">+5.2%</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>Active Customers</h3>
            <p className="stat-value">1,284</p>
            <span className="stat-change positive">+15.7%</span>
          </div>
        </div>
      </div>

      {/* Sales Chart */}
      <div className="chart-card">
        <h3>Sales Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={timeRange === 'weekly' ? 'day' : (timeRange === 'monthly' ? 'month' : 'month')} />
            <YAxis />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} name="Sales (₹)" />
            <Line type="monotone" dataKey="orders" stroke="#82ca9d" strokeWidth={2} name="Orders" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="charts-row">
        {/* Top Products */}
        <div className="chart-card">
          <h3>Top Selling Products</h3>
          <div className="products-list">
            {topProducts.map((product, index) => (
              <div key={index} className="product-item">
                <div className="product-info">
                  <span className="product-rank">#{index + 1}</span>
                  <span className="product-name">{product.name}</span>
                </div>
                <div className="product-stats">
                  <span className="product-sales">{formatCurrency(product.sales)}</span>
                  <span className="product-quantity">{product.quantity} units</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Distribution */}
        <div className="chart-card">
          <h3>Sales by Category</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
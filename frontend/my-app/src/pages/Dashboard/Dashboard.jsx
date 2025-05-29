// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react'
import { useProducts } from '../../features/products/hooks/useProducts'
import { useLocations } from '../../features/locations/hooks/useLocations'
import { useTransactions } from '../../features/transactions/hooks/useTransactions'
import { useUsers } from '../../features/users/hooks/useUsers'
import './Dashboard.css'

const Dashboard = () => {
  const { products, loading: productsLoading } = useProducts()
  const { locations, loading: locationsLoading } = useLocations()
  const { transactions, loading: transactionsLoading } = useTransactions()
  const { users, loading: usersLoading } = useUsers()

  const [dashboardStats, setDashboardStats] = useState({
    totalProducts: 0,
    lowStockItems: 0,
    totalValue: 0,
    totalLocations: 0,
    totalTransactions: 0,
    totalUsers: 0,
    stockInToday: 0,
    stockOutToday: 0,
    activeUsers: 0
  })

  const [lowStockProducts, setLowStockProducts] = useState([])
  const [recentTransactions, setRecentTransactions] = useState([])
  const [topCategories, setTopCategories] = useState([])

  // Calculate dashboard statistics
  useEffect(() => {
    // Products statistics
    const totalProducts = products.length
    const lowStock = products.filter(product => 
      product.quantity <= (product.threshold || 10)
    )
    const lowStockItems = lowStock.length
    setLowStockProducts(lowStock.slice(0, 5))

    const totalValue = products.reduce((sum, product) => 
      sum + (product.price * product.quantity), 0
    )

    // Categories analysis
    const uniqueCategories = [...new Set(products.map(p => p.category).filter(Boolean))]
    const categoryStats = uniqueCategories.map(category => {
      const categoryProducts = products.filter(p => p.category === category)
      return {
        name: category,
        count: categoryProducts.length,
        value: categoryProducts.reduce((sum, p) => sum + (p.price * p.quantity), 0)
      }
    }).sort((a, b) => b.count - a.count)
    setTopCategories(categoryStats.slice(0, 3))

    // Locations statistics
    const totalLocations = locations.length

    // Transactions statistics
    const totalTransactions = transactions.length
    const today = new Date().toDateString()
    const todayTransactions = transactions.filter(t => 
      new Date(t.timestamp).toDateString() === today
    )
    const stockInToday = todayTransactions.filter(t => t.type === 'IN').length
    const stockOutToday = todayTransactions.filter(t => t.type === 'OUT').length
    
    // Recent transactions (last 5)
    const sortedTransactions = [...transactions]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    setRecentTransactions(sortedTransactions.slice(0, 5))

    // Users statistics
    const totalUsers = users.length
    const activeUsers = users.filter(u => (u.status || 'ACTIVE') === 'ACTIVE').length

    setDashboardStats({
      totalProducts,
      lowStockItems,
      totalValue,
      totalLocations,
      totalTransactions,
      totalUsers,
      stockInToday,
      stockOutToday,
      activeUsers
    })
  }, [products, locations, transactions, users])

  const isLoading = productsLoading || locationsLoading || transactionsLoading || usersLoading

  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <h1>Dashboard</h1>
        <p>Loading dashboard data...</p>
      </div>
    )
  }

  // Helper function to get product name
  const getProductName = (productId) => {
    const product = products.find(p => p.id === productId)
    return product ? product.name : `Product ID: ${productId}`
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Inventory Dashboard</h1>
        <p>Welcome back! Here's what's happening with your inventory today.</p>
      </div>

      {/* Key Metrics Cards */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">📦</div>
          <div className="metric-content">
            <h3>Total Products</h3>
            <p className="metric-value">{dashboardStats.totalProducts}</p>
            <span className="metric-label">Items in inventory</span>
          </div>
        </div>

        <div className="metric-card alert">
          <div className="metric-icon">⚠️</div>
          <div className="metric-content">
            <h3>Low Stock Alerts</h3>
            <p className="metric-value">{dashboardStats.lowStockItems}</p>
            <span className="metric-label">Items need restocking</span>
          </div>
        </div>

        <div className="metric-card success">
          <div className="metric-icon">💰</div>
          <div className="metric-content">
            <h3>Total Inventory Value</h3>
            <p className="metric-value">${dashboardStats.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
            <span className="metric-label">Current stock value</span>
          </div>
        </div>

        <div className="metric-card info">
          <div className="metric-icon">📍</div>
          <div className="metric-content">
            <h3>Locations</h3>
            <p className="metric-value">{dashboardStats.totalLocations}</p>
            <span className="metric-label">Active locations</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">📋</div>
          <div className="metric-content">
            <h3>Total Transactions</h3>
            <p className="metric-value">{dashboardStats.totalTransactions}</p>
            <span className="metric-label">All time transactions</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">👥</div>
          <div className="metric-content">
            <h3>Active Users</h3>
            <p className="metric-value">{dashboardStats.activeUsers}</p>
            <span className="metric-label">of {dashboardStats.totalUsers} total users</span>
          </div>
        </div>
      </div>

      {/* Today's Activity */}
      <div className="activity-summary">
        <h2>📈 Today's Activity</h2>
        <div className="activity-cards">
          <div className="activity-card stock-in">
            <div className="activity-icon">📈</div>
            <div className="activity-info">
              <h3>Stock In</h3>
              <p className="activity-count">{dashboardStats.stockInToday}</p>
              <span>transactions today</span>
            </div>
          </div>
          <div className="activity-card stock-out">
            <div className="activity-icon">📉</div>
            <div className="activity-info">
              <h3>Stock Out</h3>
              <p className="activity-count">{dashboardStats.stockOutToday}</p>
              <span>transactions today</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content Grid */}
      <div className="dashboard-content">
        {/* Low Stock Alerts */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>🚨 Low Stock Alerts</h2>
            <span className="section-count">({lowStockProducts.length})</span>
          </div>
          <div className="low-stock-list">
            {lowStockProducts.length === 0 ? (
              <p className="no-data">✅ All products are well stocked!</p>
            ) : (
              lowStockProducts.map(product => (
                <div key={product.id} className="low-stock-item">
                  <div className="product-info">
                    <h4>{product.name}</h4>
                    <p>SKU: {product.sku}</p>
                  </div>
                  <div className="stock-info">
                    <span className="current-stock">{product.quantity}</span>
                    <span className="threshold">/ {product.threshold || 10}</span>
                  </div>
                  <div className="urgency-indicator">
                    {product.quantity === 0 ? '🔴' : product.quantity <= 5 ? '🟡' : '🟠'}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>📋 Recent Transactions</h2>
            <span className="section-count">({recentTransactions.length})</span>
          </div>
          <div className="recent-transactions">
            {recentTransactions.length === 0 ? (
              <p className="no-data">No recent transactions</p>
            ) : (
              recentTransactions.map(transaction => (
                <div key={transaction.id} className="transaction-item">
                  <div className="transaction-icon">
                    {transaction.type === 'IN' ? '📈' : '📉'}
                  </div>
                  <div className="transaction-info">
                    <h4>{getProductName(transaction.productId)}</h4>
                    <p>
                      {transaction.type === 'IN' ? '+' : '-'}{transaction.quantity} units
                      {transaction.userId && ` by ${transaction.userId}`}
                    </p>
                    <span className="transaction-time">
                      {new Date(transaction.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Top Categories */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>📊 Top Categories</h2>
            <span className="section-count">({topCategories.length})</span>
          </div>
          <div className="categories-list">
            {topCategories.length === 0 ? (
              <p className="no-data">No categories found</p>
            ) : (
              topCategories.map((category, index) => (
                <div key={category.name} className="category-item">
                  <div className="category-rank">#{index + 1}</div>
                  <div className="category-info">
                    <h4>{category.name || 'Uncategorized'}</h4>
                    <p>{category.count} products</p>
                  </div>
                  <div className="category-value">
                    ${category.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>⚡ Quick Actions</h2>
          </div>
          <div className="quick-actions">
            <button 
              className="action-btn primary"
              onClick={() => window.location.href = '/products'}
            >
              📦 Manage Products
            </button>
            <button 
              className="action-btn secondary"
              onClick={() => window.location.href = '/transactions'}
            >
              📋 Record Transaction
            </button>
            <button 
              className="action-btn secondary"
              onClick={() => window.location.href = '/locations'}
            >
              📍 Manage Locations
            </button>
            <button 
              className="action-btn secondary"
              onClick={() => window.location.href = '/users'}
            >
              👥 Manage Users
            </button>
          </div>
        </div>

        {/* System Status */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>🔧 System Status</h2>
          </div>
          <div className="system-status">
            <div className="status-item">
              <div className="status-indicator active"></div>
              <span>Database Connected</span>
            </div>
            <div className="status-item">
              <div className="status-indicator active"></div>
              <span>API Services Online</span>
            </div>
            <div className="status-item">
              <div className="status-indicator active"></div>
              <span>All Systems Operational</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

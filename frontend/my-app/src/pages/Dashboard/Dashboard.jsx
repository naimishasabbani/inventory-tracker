// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react'
import { useProducts } from '../../features/products/hooks/useProducts'
import './Dashboard.css'

const Dashboard = () => {
  const { products, loading } = useProducts()
  const [dashboardStats, setDashboardStats] = useState({
    totalProducts: 0,
    lowStockItems: 0,
    totalValue: 0,
    categories: 0,
    recentTransactions: 0
  })
  const [lowStockProducts, setLowStockProducts] = useState([])
  const [topCategories, setTopCategories] = useState([])

  // Calculate dashboard statistics
  useEffect(() => {
    if (products.length > 0) {
      // Calculate total products
      const totalProducts = products.length

      // Calculate low stock items (quantity <= threshold)
      const lowStock = products.filter(product => 
        product.quantity <= (product.threshold || 10)
      )
      const lowStockItems = lowStock.length
      setLowStockProducts(lowStock.slice(0, 5)) // Show top 5 low stock items

      // Calculate total inventory value
      const totalValue = products.reduce((sum, product) => 
        sum + (product.price * product.quantity), 0
      )

      // Calculate unique categories
      const uniqueCategories = [...new Set(products.map(p => p.category).filter(Boolean))]
      const categories = uniqueCategories.length

      // Calculate category distribution
      const categoryStats = uniqueCategories.map(category => {
        const categoryProducts = products.filter(p => p.category === category)
        return {
          name: category,
          count: categoryProducts.length,
          value: categoryProducts.reduce((sum, p) => sum + (p.price * p.quantity), 0)
        }
      }).sort((a, b) => b.count - a.count)
      setTopCategories(categoryStats.slice(0, 5))

      setDashboardStats({
        totalProducts,
        lowStockItems,
        totalValue,
        categories,
        recentTransactions: 0 // Will be updated when transaction feature is added
      })
    }
  }, [products])

  if (loading) {
    return (
      <div className="dashboard-loading">
        <h1>Dashboard</h1>
        <p>Loading dashboard data...</p>
      </div>
    )
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
          <div className="metric-icon">📊</div>
          <div className="metric-content">
            <h3>Product Categories</h3>
            <p className="metric-value">{dashboardStats.categories}</p>
            <span className="metric-label">Different categories</span>
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

        {/* Top Categories */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>📈 Top Categories</h2>
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
              📦 View All Products
            </button>
            <button 
              className="action-btn secondary"
              onClick={() => window.location.href = '/products?filter=lowstock'}
            >
              ⚠️ Manage Low Stock
            </button>
            <button 
              className="action-btn secondary"
              onClick={() => window.location.href = '/transactions'}
            >
              📋 View Transactions
            </button>
            <button 
              className="action-btn secondary"
              onClick={() => window.location.href = '/locations'}
            >
              📍 Manage Locations
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>📅 Recent Activity</h2>
          </div>
          <div className="recent-activity">
            <div className="activity-item">
              <div className="activity-icon">✅</div>
              <div className="activity-content">
                <p>Dashboard loaded successfully</p>
                <span className="activity-time">Just now</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon">📊</div>
              <div className="activity-content">
                <p>Inventory data synchronized</p>
                <span className="activity-time">2 minutes ago</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon">🔄</div>
              <div className="activity-content">
                <p>System status: All services operational</p>
                <span className="activity-time">5 minutes ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

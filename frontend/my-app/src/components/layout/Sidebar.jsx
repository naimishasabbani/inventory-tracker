// src/components/layout/Sidebar.jsx
import React from 'react'
import { NavLink } from 'react-router-dom'
import './Sidebar.css'

const Sidebar = () => {
  const navItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/products', label: 'Products', icon: '📦' },
    { path: '/transactions', label: 'Transactions', icon: '📋' },
    { path: '/locations', label: 'Locations', icon: '📍' },
    { path: '/users', label: 'Users', icon: '👥' },
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Inventory Manager</h2>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `nav-item ${isActive ? 'nav-item--active' : ''}`
            }
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar

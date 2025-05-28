// src/components/layout/Header.jsx
import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="page-title">Dashboard</h1>
        <div className="header-actions">
          <button className="user-menu">
            👤 Admin
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header

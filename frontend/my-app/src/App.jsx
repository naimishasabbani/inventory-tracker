// src/App.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import Dashboard from './pages/Dashboard/Dashboard'
import Products from './pages/Products/Products'
import Transactions from './pages/Transactions/Transaction'
import Users from './pages/Users/Users'
import Locations from './pages/Locations/Locations'
import ConnectionTest from './components/ConnectionTest'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={
          <div>
            <ConnectionTest />
            <Dashboard />
          </div>
        } />
        <Route path="products" element={<Products />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="users" element={<Users />} />
        <Route path="locations" element={<Locations />} />
      </Route>
    </Routes>
  )
}

export default App

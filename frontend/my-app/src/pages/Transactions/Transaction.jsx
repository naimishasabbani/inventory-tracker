// src/pages/Transactions.jsx
import React, { useState } from 'react'
import { useTransactions } from '../../features/transactions/hooks/useTransactions'
import { useProducts } from '../../features/products/hooks/useProducts'
import TransactionList from '../../features/transactions/components/TransactionList'
import TransactionForm from '../../features/transactions/components/TransactionForm'
import Modal from '../../components/common/Modal'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import { TRANSACTION_TYPE_LABELS, TRANSACTION_TYPES } from '../../features/transactions/types/transactionTypes'

const Transactions = () => {
  const {
    transactions,
    loading: transactionLoading,
    error,
    success,
    createTransaction,
    deleteTransaction,
    fetchTransactions,
    getTransactionsByType,
    clearMessages
  } = useTransactions()

  const { products } = useProducts()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('')

  // Mock users data (replace with actual users when user management is implemented)
  const mockUsers = [
    { id: 'user1', username: 'admin', role: 'Admin' },
    { id: 'user2', username: 'manager', role: 'Manager' },
    { id: 'user3', username: 'staff', role: 'Staff' }
  ]

  // Filter transactions based on search and type
  const filteredTransactions = transactions.filter(transaction => {
    const product = products.find(p => p.id === transaction.productId)
    const productName = product ? product.name.toLowerCase() : ''
    const notes = transaction.notes ? transaction.notes.toLowerCase() : ''
    
    const matchesSearch = productName.includes(searchTerm.toLowerCase()) ||
                         notes.includes(searchTerm.toLowerCase()) ||
                         transaction.userId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = !filterType || transaction.type === filterType
    return matchesSearch && matchesType
  })

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      await deleteTransaction(id)
    }
  }

  const handleView = (transaction) => {
    const product = products.find(p => p.id === transaction.productId)
    const productName = product ? product.name : `Product ID: ${transaction.productId}`
    
    const transactionDetails = `
Transaction Details:
Product: ${productName}
Type: ${TRANSACTION_TYPE_LABELS[transaction.type]}
Quantity: ${transaction.type === 'IN' ? '+' : '-'}${transaction.quantity}
User: ${transaction.userId}
Date: ${new Date(transaction.timestamp).toLocaleString()}
Notes: ${transaction.notes || 'N/A'}
    `.trim()
    alert(transactionDetails)
  }

  const handleSubmit = async (formData) => {
    const result = await createTransaction(formData)
    
    if (result.success) {
      setIsModalOpen(false)
    }
    
    return result
  }

  const handleFilterByType = (type) => {
    setFilterType(type)
    if (type) {
      getTransactionsByType(type)
    } else {
      fetchTransactions()
    }
  }

  const handleRefresh = () => {
    setSearchTerm('')
    setFilterType('')
    fetchTransactions()
  }

  // Calculate summary statistics
  const totalTransactions = filteredTransactions.length
  const stockInCount = filteredTransactions.filter(t => t.type === 'IN').length
  const stockOutCount = filteredTransactions.filter(t => t.type === 'OUT').length

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Transactions ({totalTransactions})</h1>
        <Button onClick={() => setIsModalOpen(true)} disabled={transactionLoading}>
          Record Transaction
        </Button>
      </div>

      {/* Summary Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '16px', 
        marginBottom: '20px' 
      }}>
        <div style={{ 
          background: 'white', 
          padding: '16px', 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          borderLeft: '4px solid #007bff'
        }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#6c757d' }}>TOTAL TRANSACTIONS</h3>
          <p style={{ margin: '0', fontSize: '24px', fontWeight: 'bold', color: '#2c3e50' }}>{totalTransactions}</p>
        </div>
        <div style={{ 
          background: 'white', 
          padding: '16px', 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          borderLeft: '4px solid #28a745'
        }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#6c757d' }}>STOCK IN</h3>
          <p style={{ margin: '0', fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>{stockInCount}</p>
        </div>
        <div style={{ 
          background: 'white', 
          padding: '16px', 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          borderLeft: '4px solid #dc3545'
        }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#6c757d' }}>STOCK OUT</h3>
          <p style={{ margin: '0', fontSize: '24px', fontWeight: 'bold', color: '#dc3545' }}>{stockOutCount}</p>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div style={{ 
          background: '#f8d7da', 
          color: '#721c24', 
          padding: '10px', 
          borderRadius: '4px', 
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>{error}</span>
          <button onClick={clearMessages} style={{ background: 'none', border: 'none', fontSize: '16px' }}>×</button>
        </div>
      )}
      
      {success && (
        <div style={{ 
          background: '#d4edda', 
          color: '#155724', 
          padding: '10px', 
          borderRadius: '4px', 
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>{success}</span>
          <button onClick={clearMessages} style={{ background: 'none', border: 'none', fontSize: '16px' }}>×</button>
        </div>
      )}

      {/* Search and Filters */}
      <div style={{ 
        background: 'white', 
        padding: '20px', 
        borderRadius: '8px', 
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'end', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <Input
              label="Search Transactions"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by product, user, or notes..."
            />
          </div>
          <div style={{ minWidth: '150px' }}>
            <label className="input-label">Filter by Type</label>
            <select
              value={filterType}
              onChange={(e) => handleFilterByType(e.target.value)}
              className="input"
            >
              <option value="">All Types</option>
              {Object.entries(TRANSACTION_TYPE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <Button type="button" variant="secondary" onClick={handleRefresh} disabled={transactionLoading}>
            🔄 Refresh
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {transactionLoading && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Loading transactions...</p>
        </div>
      )}

      {/* Transaction List */}
      {!transactionLoading && (
        <TransactionList 
          transactions={filteredTransactions}
          onDelete={handleDelete}
          onView={handleView}
          products={products}
        />
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Record New Transaction"
        size="medium"
      >
        <TransactionForm
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
          loading={transactionLoading}
          products={products}
          users={mockUsers}
        />
      </Modal>
    </div>
  )
}

export default Transactions

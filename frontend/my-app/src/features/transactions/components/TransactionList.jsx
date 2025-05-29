// src/features/transactions/components/TransactionList.jsx
import React from 'react'
import Button from '../../../components/common/Button'
import { TRANSACTION_TYPE_LABELS } from '../types/transactionTypes'
import './TransactionList.css'

const TransactionList = ({ transactions, onDelete, onView, products = [] }) => {
  // Helper function to get product name by ID
  const getProductName = (productId) => {
    const product = products.find(p => p.id === productId)
    return product ? product.name : `Product ID: ${productId}`
  }

  // Helper function to format date
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString()
  }

  return (
    <div className="transaction-list">
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Product</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>User</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>
                  <div className="transaction-date">
                    {formatDate(transaction.timestamp)}
                  </div>
                </td>
                <td>
                  <div className="product-info">
                    {getProductName(transaction.productId)}
                  </div>
                </td>
                <td>
                  <span className={`transaction-type transaction-type--${transaction.type.toLowerCase()}`}>
                    {transaction.type === 'IN' ? '📈' : '📉'} {TRANSACTION_TYPE_LABELS[transaction.type]}
                  </span>
                </td>
                <td>
                  <span className={`quantity quantity--${transaction.type.toLowerCase()}`}>
                    {transaction.type === 'IN' ? '+' : '-'}{transaction.quantity}
                  </span>
                </td>
                <td>
                  <div className="user-info">
                    {transaction.userId || 'System'}
                  </div>
                </td>
                <td>
                  <div className="transaction-notes">
                    {transaction.notes || '-'}
                  </div>
                </td>
                <td>
                  <div className="action-buttons">
                    <Button size="small" onClick={() => onView(transaction)}>
                      View
                    </Button>
                    <Button size="small" variant="danger" onClick={() => onDelete(transaction.id)}>
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {transactions.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h3>No transactions found</h3>
          <p>Start recording inventory movements to see transaction history.</p>
        </div>
      )}
    </div>
  )
}

export default TransactionList

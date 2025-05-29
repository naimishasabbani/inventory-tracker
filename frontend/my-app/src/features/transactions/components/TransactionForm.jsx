// src/features/transactions/components/TransactionForm.jsx
import React, { useState} from 'react'
import Input from '../../../components/common/Input'
import Button from '../../../components/common/Button'
import { TRANSACTION_TYPES, TRANSACTION_TYPE_LABELS, TRANSACTION_REASONS } from '../types/transactionTypes'

const TransactionForm = ({ onSubmit, onCancel, loading, products = [], users = [] }) => {
  const [formData, setFormData] = useState({
    productId: '',
    type: TRANSACTION_TYPES.IN,
    quantity: '',
    userId: '',
    notes: '',
    reason: ''
  })
  
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.productId) newErrors.productId = 'Product is required'
    if (!formData.type) newErrors.type = 'Transaction type is required'
    if (!formData.quantity || parseInt(formData.quantity) <= 0) {
      newErrors.quantity = 'Valid quantity is required'
    }
    if (!formData.userId) newErrors.userId = 'User is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    const submitData = {
      ...formData,
      quantity: parseInt(formData.quantity),
      timestamp: new Date().toISOString()
    }
    
    const result = await onSubmit(submitData)
    
    if (result?.success) {
      // Reset form after successful submission
      setFormData({
        productId: '',
        type: TRANSACTION_TYPES.IN,
        quantity: '',
        userId: '',
        notes: '',
        reason: ''
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <div className="input-group">
        <label className="input-label">
          Product <span className="required">*</span>
        </label>
        <select
          name="productId"
          value={formData.productId}
          onChange={handleChange}
          className={`input ${errors.productId ? 'input--error' : ''}`}
          disabled={loading}
          required
        >
          <option value="">Select a product</option>
          {products.map(product => (
            <option key={product.id} value={product.id}>
              {product.name} (SKU: {product.sku})
            </option>
          ))}
        </select>
        {errors.productId && <span className="input-error">{errors.productId}</span>}
      </div>
      
      <div className="input-group">
        <label className="input-label">
          Transaction Type <span className="required">*</span>
        </label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className={`input ${errors.type ? 'input--error' : ''}`}
          disabled={loading}
          required
        >
          {Object.entries(TRANSACTION_TYPE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {errors.type && <span className="input-error">{errors.type}</span>}
      </div>
      
      <Input
        label="Quantity"
        name="quantity"
        type="number"
        min="1"
        value={formData.quantity}
        onChange={handleChange}
        error={errors.quantity}
        required
        disabled={loading}
        placeholder="Enter quantity"
      />
      
      <div className="input-group">
        <label className="input-label">
          User <span className="required">*</span>
        </label>
        <select
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          className={`input ${errors.userId ? 'input--error' : ''}`}
          disabled={loading}
          required
        >
          <option value="">Select a user</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.username} ({user.role})
            </option>
          ))}
          <option value="system">System</option>
        </select>
        {errors.userId && <span className="input-error">{errors.userId}</span>}
      </div>
      
      <div className="input-group">
        <label className="input-label">Reason</label>
        <select
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          className="input"
          disabled={loading}
        >
          <option value="">Select reason (optional)</option>
          {Object.entries(TRANSACTION_REASONS).map(([key, value]) => (
            <option key={key} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
      
      <div className="input-group">
        <label className="input-label">Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="input textarea"
          disabled={loading}
          placeholder="Additional notes (optional)"
          rows="3"
        />
      </div>
      
      <div className="form-actions">
        <Button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Record Transaction'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

export default TransactionForm

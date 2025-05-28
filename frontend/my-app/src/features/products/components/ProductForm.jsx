// src/features/products/components/ProductForm.jsx
import React, { useState, useEffect } from 'react'
import Input from '../../../components/common/Input'
import Button from '../../../components/common/Button'

const ProductForm = ({ product, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    description: '',
    price: '',
    quantity: '',
    category: '',
    threshold: '',
    locationId: ''
  })
  
  const [errors, setErrors] = useState({})

  // Populate form when product prop changes
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        sku: product.sku || '',
        description: product.description || '',
        price: product.price || '',
        quantity: product.quantity || '',
        category: product.category || '',
        threshold: product.threshold || '',
        locationId: product.locationId || ''
      })
    }
  }, [product])

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
    
    if (!formData.name.trim()) newErrors.name = 'Product name is required'
    if (!formData.sku.trim()) newErrors.sku = 'SKU is required'
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Valid price is required'
    }
    if (!formData.quantity || parseInt(formData.quantity) < 0) {
      newErrors.quantity = 'Valid quantity is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    const submitData = {
      ...formData,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
      threshold: parseInt(formData.threshold) || 0
    }
    
    const result = await onSubmit(submitData)
    
    if (result?.success && !product) {
      // Reset form only for new products
      setFormData({
        name: '',
        sku: '',
        description: '',
        price: '',
        quantity: '',
        category: '',
        threshold: '',
        locationId: ''
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <Input
        label="Product Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        required
        disabled={loading}
      />
      
      <Input
        label="SKU"
        name="sku"
        value={formData.sku}
        onChange={handleChange}
        error={errors.sku}
        required
        disabled={loading}
      />
      
      <Input
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        disabled={loading}
      />
      
      <Input
        label="Price"
        name="price"
        type="number"
        step="0.01"
        value={formData.price}
        onChange={handleChange}
        error={errors.price}
        required
        disabled={loading}
      />
      
      <Input
        label="Quantity"
        name="quantity"
        type="number"
        value={formData.quantity}
        onChange={handleChange}
        error={errors.quantity}
        required
        disabled={loading}
      />
      
      <Input
        label="Category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        disabled={loading}
      />
      
      <Input
        label="Low Stock Threshold"
        name="threshold"
        type="number"
        value={formData.threshold}
        onChange={handleChange}
        disabled={loading}
      />
      
      <Input
        label="Location ID"
        name="locationId"
        value={formData.locationId}
        onChange={handleChange}
        disabled={loading}
      />
      
      <div className="form-actions">
        <Button type="submit" disabled={loading}>
          {loading ? 'Processing...' : (product ? 'Update Product' : 'Create Product')}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

export default ProductForm

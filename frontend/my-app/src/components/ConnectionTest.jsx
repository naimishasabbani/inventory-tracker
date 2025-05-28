// src/components/ConnectionTest.jsx
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ConnectionTest = () => {
  const [connectionStatus, setConnectionStatus] = useState('Testing...')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const API_BASE_URL = 'http://localhost:8080/api'

  useEffect(() => {
    testConnection()
  }, [])

  const testConnection = async () => {
    setLoading(true)
    setError('')
    try {
      console.log('Testing connection to:', API_BASE_URL + '/products')
      const response = await axios.get(`${API_BASE_URL}/products`)
      setConnectionStatus('✅ Backend Connected Successfully!')
      setProducts(response.data)
      console.log('Products received:', response.data)
    } catch (error) {
      console.error('Connection failed:', error)
      setConnectionStatus('❌ Backend Connection Failed')
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const testCreateProduct = async () => {
    setLoading(true)
    setError('')
    try {
      const testProduct = {
        name: 'Test Product ' + Date.now(),
        sku: 'TEST' + Date.now(),
        description: 'This is a test product',
        price: 99.99,
        quantity: 10,
        category: 'Electronics',
        threshold: 5,
        locationId: 'test-location'
      }
      
      console.log('Creating product:', testProduct)
      const response = await axios.post(`${API_BASE_URL}/products`, testProduct)
      console.log('Product created:', response.data)
      setConnectionStatus('✅ Product Created Successfully!')
      
      // Refresh the product list
      await testConnection()
    } catch (error) {
      console.error('Create product failed:', error)
      setError('Failed to create product: ' + (error.response?.data?.message || error.message))
    } finally {
      setLoading(false)
    }
  }

  const testUpdateProduct = async () => {
    if (products.length === 0) {
      setError('No products available to update')
      return
    }

    setLoading(true)
    setError('')
    try {
      const productToUpdate = products[0]
      const updatedProduct = {
        ...productToUpdate,
        name: productToUpdate.name + ' (Updated)',
        quantity: productToUpdate.quantity + 5
      }
      
      console.log('Updating product:', updatedProduct)
      const response = await axios.put(`${API_BASE_URL}/products/${productToUpdate.id}`, updatedProduct)
      console.log('Product updated:', response.data)
      setConnectionStatus('✅ Product Updated Successfully!')
      
      // Refresh the product list
      await testConnection()
    } catch (error) {
      console.error('Update product failed:', error)
      setError('Failed to update product: ' + (error.response?.data?.message || error.message))
    } finally {
      setLoading(false)
    }
  }

  const testDeleteProduct = async () => {
    if (products.length === 0) {
      setError('No products available to delete')
      return
    }

    setLoading(true)
    setError('')
    try {
      const productToDelete = products[products.length - 1] // Delete last product
      
      console.log('Deleting product:', productToDelete.id)
      await axios.delete(`${API_BASE_URL}/products/${productToDelete.id}`)
      console.log('Product deleted successfully')
      setConnectionStatus('✅ Product Deleted Successfully!')
      
      // Refresh the product list
      await testConnection()
    } catch (error) {
      console.error('Delete product failed:', error)
      setError('Failed to delete product: ' + (error.response?.data?.message || error.message))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ 
      padding: '20px', 
      border: '2px solid #007bff', 
      borderRadius: '8px', 
      margin: '20px',
      backgroundColor: '#f8f9fa'
    }}>
      <h2>🔗 Backend Connection Test</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <p><strong>API URL:</strong> {API_BASE_URL}</p>
        <p><strong>Status:</strong> <span style={{ fontSize: '16px' }}>{connectionStatus}</span></p>
        {error && <p style={{ color: 'red' }}><strong>Error:</strong> {error}</p>}
        {loading && <p style={{ color: 'blue' }}>⏳ Loading...</p>}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={testConnection} 
          disabled={loading}
          style={{ marginRight: '10px', padding: '8px 16px' }}
        >
          🔄 Test Connection (GET)
        </button>
        <button 
          onClick={testCreateProduct} 
          disabled={loading}
          style={{ marginRight: '10px', padding: '8px 16px' }}
        >
          ➕ Test Create (POST)
        </button>
        <button 
          onClick={testUpdateProduct} 
          disabled={loading || products.length === 0}
          style={{ marginRight: '10px', padding: '8px 16px' }}
        >
          ✏️ Test Update (PUT)
        </button>
        <button 
          onClick={testDeleteProduct} 
          disabled={loading || products.length === 0}
          style={{ padding: '8px 16px' }}
        >
          🗑️ Test Delete (DELETE)
        </button>
      </div>

      <div>
        <h3>📦 Products in Database ({products.length})</h3>
        {products.length === 0 ? (
          <p style={{ fontStyle: 'italic', color: '#666' }}>No products found</p>
        ) : (
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#e9ecef' }}>
                  <th style={{ padding: '8px', border: '1px solid #ddd' }}>ID</th>
                  <th style={{ padding: '8px', border: '1px solid #ddd' }}>Name</th>
                  <th style={{ padding: '8px', border: '1px solid #ddd' }}>SKU</th>
                  <th style={{ padding: '8px', border: '1px solid #ddd' }}>Price</th>
                  <th style={{ padding: '8px', border: '1px solid #ddd' }}>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{product.id}</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{product.name}</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{product.sku}</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>${product.price}</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{product.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default ConnectionTest

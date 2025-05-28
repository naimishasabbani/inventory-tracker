// src/features/products/hooks/useProducts.js
import { useState, useEffect } from 'react'
import { productService } from '../api/productService' // ← This should now work

export const useProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Clear messages
  const clearMessages = () => {
    setError('')
    setSuccess('')
  }

  // Auto clear messages after 5 seconds
  const autoCloseMessages = () => {
    setTimeout(() => {
      setError('')
      setSuccess('')
    }, 5000)
  }

  // Fetch all products
  const fetchProducts = async () => {
    setLoading(true)
    setError('')
    
    try {
      const result = await productService.getAllProducts()
      
      if (result.success) {
        setProducts(result.data)
        setSuccess(result.message)
      } else {
        setError(result.message)
        setProducts([])
      }
    } catch (error) {
      console.error('Fetch products error:', error)
      setError(error.message || 'Failed to fetch products')
      setProducts([])
    } finally {
      setLoading(false)
      autoCloseMessages()
    }
  }

  // Create product
  const createProduct = async (productData) => {
    setLoading(true)
    setError('')
    
    try {
      const result = await productService.createProduct(productData)
      
      if (result.success) {
        setProducts(prev => [...prev, result.data])
        setSuccess(result.message)
        return { success: true, data: result.data }
      } else {
        setError(result.message)
        return { success: false, message: result.message }
      }
    } catch (error) {
      console.error('Create product error:', error)
      const errorMessage = error.message || 'Failed to create product'
      setError(errorMessage)
      return { success: false, message: errorMessage }
    } finally {
      setLoading(false)
      autoCloseMessages()
    }
  }

  // Update product
  const updateProduct = async (id, productData) => {
    setLoading(true)
    setError('')
    
    try {
      const result = await productService.updateProduct(id, productData)
      
      if (result.success) {
        setProducts(prev => 
          prev.map(product => 
            product.id === id ? result.data : product
          )
        )
        setSuccess(result.message)
        return { success: true, data: result.data }
      } else {
        setError(result.message)
        return { success: false, message: result.message }
      }
    } catch (error) {
      console.error('Update product error:', error)
      const errorMessage = error.message || 'Failed to update product'
      setError(errorMessage)
      return { success: false, message: errorMessage }
    } finally {
      setLoading(false)
      autoCloseMessages()
    }
  }

  // Delete product
  const deleteProduct = async (id) => {
    setLoading(true)
    setError('')
    
    try {
      const result = await productService.deleteProduct(id)
      
      if (result.success) {
        setProducts(prev => prev.filter(product => product.id !== id))
        setSuccess(result.message)
        return { success: true }
      } else {
        setError(result.message)
        return { success: false, message: result.message }
      }
    } catch (error) {
      console.error('Delete product error:', error)
      const errorMessage = error.message || 'Failed to delete product'
      setError(errorMessage)
      return { success: false, message: errorMessage }
    } finally {
      setLoading(false)
      autoCloseMessages()
    }
  }

  // Search products
  const searchProducts = async (searchTerm) => {
    setLoading(true)
    setError('')
    
    try {
      const result = searchTerm?.trim() 
        ? await productService.searchProducts(searchTerm)
        : await productService.getAllProducts()
      
      if (result.success) {
        setProducts(result.data)
        setSuccess(`Found ${result.data.length} products`)
      } else {
        setError(result.message)
        setProducts([])
      }
    } catch (error) {
      console.error('Search products error:', error)
      setError(error.message || 'Search failed')
      setProducts([])
    } finally {
      setLoading(false)
      autoCloseMessages()
    }
  }

  // Get low stock products
  const getLowStockProducts = async (threshold = 10) => {
    setLoading(true)
    setError('')
    
    try {
      const result = await productService.getLowStockProducts(threshold)
      
      if (result.success) {
        setProducts(result.data)
        setSuccess(`Found ${result.data.length} low stock products`)
      } else {
        setError(result.message)
        setProducts([])
      }
    } catch (error) {
      console.error('Get low stock products error:', error)
      setError(error.message || 'Failed to fetch low stock products')
      setProducts([])
    } finally {
      setLoading(false)
      autoCloseMessages()
    }
  }

  // Load products on mount
  useEffect(() => {
    fetchProducts()
  }, [])

  return {
    products,
    loading,
    error,
    success,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    getLowStockProducts,
    clearMessages
  }
}

export default useProducts

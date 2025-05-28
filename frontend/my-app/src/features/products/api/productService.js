// src/features/products/api/productService.js
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

// Create axios instance with interceptors
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to:`, config.url)
    return config
  },
  (error) => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.status, response.data)
    return response
  },
  (error) => {
    console.error('Response error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

export const productService = {
  // Get all products
  getAllProducts: async () => {
    try {
      const response = await api.get('/products')
      return {
        success: true,
        data: response.data,
        message: 'Products fetched successfully'
      }
    } catch (error) {
      return {
        success: false,
        data: [],
        message: error.response?.data?.message || 'Failed to fetch products',
        error: error
      }
    }
  },

  // Get product by ID
  getProductById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`)
      return {
        success: true,
        data: response.data,
        message: 'Product fetched successfully'
      }
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to fetch product',
        error: error
      }
    }
  },

  // Create new product
  createProduct: async (productData) => {
    try {
      // Validate required fields
      const requiredFields = ['name', 'sku', 'price', 'quantity']
      const missingFields = requiredFields.filter(field => !productData[field])
      
      if (missingFields.length > 0) {
        return {
          success: false,
          data: null,
          message: `Missing required fields: ${missingFields.join(', ')}`
        }
      }

      const response = await api.post('/products', productData)
      return {
        success: true,
        data: response.data,
        message: 'Product created successfully'
      }
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to create product',
        error: error
      }
    }
  },

  // Update product
  updateProduct: async (id, productData) => {
    try {
      if (!id) {
        return {
          success: false,
          data: null,
          message: 'Product ID is required for update'
        }
      }

      const response = await api.put(`/products/${id}`, productData)
      return {
        success: true,
        data: response.data,
        message: 'Product updated successfully'
      }
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to update product',
        error: error
      }
    }
  },

  // Delete product
  deleteProduct: async (id) => {
    try {
      if (!id) {
        return {
          success: false,
          message: 'Product ID is required for deletion'
        }
      }

      await api.delete(`/products/${id}`)
      return {
        success: true,
        message: 'Product deleted successfully'
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to delete product',
        error: error
      }
    }
  },

  // Search products by name
  searchProducts: async (searchTerm) => {
    try {
      const response = await api.get(`/products/search?name=${encodeURIComponent(searchTerm)}`)
      return {
        success: true,
        data: response.data,
        message: 'Search completed successfully'
      }
    } catch (error) {
      return {
        success: false,
        data: [],
        message: error.response?.data?.message || 'Search failed',
        error: error
      }
    }
  },

  // Get low stock products
  getLowStockProducts: async (threshold = 10) => {
    try {
      const response = await api.get(`/products/low-stock?threshold=${threshold}`)
      return {
        success: true,
        data: response.data,
        message: 'Low stock products fetched successfully'
      }
    } catch (error) {
      return {
        success: false,
        data: [],
        message: error.response?.data?.message || 'Failed to fetch low stock products',
        error: error
      }
    }
  }
}

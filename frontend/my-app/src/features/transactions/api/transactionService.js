// src/features/transactions/api/transactionService.js
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

// Create axios instance
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

export const transactionService = {
  // Get all transactions
  getAllTransactions: async () => {
    try {
      const response = await api.get('/transactions')
      return {
        success: true,
        data: response.data,
        message: 'Transactions fetched successfully'
      }
    } catch (error) {
      return {
        success: false,
        data: [],
        message: error.response?.data?.message || 'Failed to fetch transactions',
        error: error
      }
    }
  },

  // Get transaction by ID
  getTransactionById: async (id) => {
    try {
      const response = await api.get(`/transactions/${id}`)
      return {
        success: true,
        data: response.data,
        message: 'Transaction fetched successfully'
      }
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to fetch transaction',
        error: error
      }
    }
  },

  // Create new transaction
  createTransaction: async (transactionData) => {
    try {
      // Validate required fields
      const requiredFields = ['productId', 'type', 'quantity', 'userId']
      const missingFields = requiredFields.filter(field => !transactionData[field])
      
      if (missingFields.length > 0) {
        return {
          success: false,
          data: null,
          message: `Missing required fields: ${missingFields.join(', ')}`
        }
      }

      // Add timestamp if not provided
      const dataWithTimestamp = {
        ...transactionData,
        timestamp: transactionData.timestamp || new Date().toISOString()
      }

      const response = await api.post('/transactions', dataWithTimestamp)
      return {
        success: true,
        data: response.data,
        message: 'Transaction created successfully'
      }
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to create transaction',
        error: error
      }
    }
  },

  // Delete transaction
  deleteTransaction: async (id) => {
    try {
      if (!id) {
        return {
          success: false,
          message: 'Transaction ID is required for deletion'
        }
      }

      await api.delete(`/transactions/${id}`)
      return {
        success: true,
        message: 'Transaction deleted successfully'
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to delete transaction',
        error: error
      }
    }
  },

  // Get transactions by product ID
  getTransactionsByProduct: async (productId) => {
    try {
      const response = await api.get(`/transactions/by-product/${productId}`)
      return {
        success: true,
        data: response.data,
        message: 'Product transactions fetched successfully'
      }
    } catch (error) {
      return {
        success: false,
        data: [],
        message: error.response?.data?.message || 'Failed to fetch product transactions',
        error: error
      }
    }
  },

  // Get transactions by user ID
  getTransactionsByUser: async (userId) => {
    try {
      const response = await api.get(`/transactions/by-user/${userId}`)
      return {
        success: true,
        data: response.data,
        message: 'User transactions fetched successfully'
      }
    } catch (error) {
      return {
        success: false,
        data: [],
        message: error.response?.data?.message || 'Failed to fetch user transactions',
        error: error
      }
    }
  },

  // Get transactions by type
  getTransactionsByType: async (type) => {
    try {
      const response = await api.get(`/transactions/by-type?type=${type}`)
      return {
        success: true,
        data: response.data,
        message: 'Transactions by type fetched successfully'
      }
    } catch (error) {
      return {
        success: false,
        data: [],
        message: error.response?.data?.message || 'Failed to fetch transactions by type',
        error: error
      }
    }
  }
}

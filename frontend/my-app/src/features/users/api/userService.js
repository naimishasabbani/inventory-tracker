// src/features/users/api/userService.js
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

export const userService = {
  // Get all users
  getAllUsers: async () => {
    try {
      const response = await api.get('/users')
      return {
        success: true,
        data: response.data,
        message: 'Users fetched successfully'
      }
    } catch (error) {
      return {
        success: false,
        data: [],
        message: error.response?.data?.message || 'Failed to fetch users',
        error: error
      }
    }
  },

  // Get user by ID
  getUserById: async (id) => {
    try {
      const response = await api.get(`/users/${id}`)
      return {
        success: true,
        data: response.data,
        message: 'User fetched successfully'
      }
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to fetch user',
        error: error
      }
    }
  },

  // Get user by username
  getUserByUsername: async (username) => {
    try {
      const response = await api.get(`/users/by-username?username=${encodeURIComponent(username)}`)
      return {
        success: true,
        data: response.data,
        message: 'User fetched successfully'
      }
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to fetch user',
        error: error
      }
    }
  },

  // Create new user
  createUser: async (userData) => {
    try {
      // Validate required fields
      const requiredFields = ['username', 'email', 'role']
      const missingFields = requiredFields.filter(field => !userData[field])
      
      if (missingFields.length > 0) {
        return {
          success: false,
          data: null,
          message: `Missing required fields: ${missingFields.join(', ')}`
        }
      }

      // Add creation timestamp
      const dataWithTimestamp = {
        ...userData,
        createdAt: new Date().toISOString()
      }

      const response = await api.post('/users', dataWithTimestamp)
      return {
        success: true,
        data: response.data,
        message: 'User created successfully'
      }
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to create user',
        error: error
      }
    }
  },

  // Update user
  updateUser: async (id, userData) => {
    try {
      if (!id) {
        return {
          success: false,
          data: null,
          message: 'User ID is required for update'
        }
      }

      const response = await api.put(`/users/${id}`, userData)
      return {
        success: true,
        data: response.data,
        message: 'User updated successfully'
      }
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to update user',
        error: error
      }
    }
  },

  // Delete user
  deleteUser: async (id) => {
    try {
      if (!id) {
        return {
          success: false,
          message: 'User ID is required for deletion'
        }
      }

      await api.delete(`/users/${id}`)
      return {
        success: true,
        message: 'User deleted successfully'
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to delete user',
        error: error
      }
    }
  }
}

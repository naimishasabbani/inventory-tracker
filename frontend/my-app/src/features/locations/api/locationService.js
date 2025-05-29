// src/features/locations/api/locationService.js
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

export const locationService = {
  // Get all locations
  getAllLocations: async () => {
    try {
      const response = await api.get('/locations')
      return {
        success: true,
        data: response.data,
        message: 'Locations fetched successfully'
      }
    } catch (error) {
      return {
        success: false,
        data: [],
        message: error.response?.data?.message || 'Failed to fetch locations',
        error: error
      }
    }
  },

  // Get location by ID
  getLocationById: async (id) => {
    try {
      const response = await api.get(`/locations/${id}`)
      return {
        success: true,
        data: response.data,
        message: 'Location fetched successfully'
      }
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to fetch location',
        error: error
      }
    }
  },

  // Create new location
  createLocation: async (locationData) => {
    try {
      // Validate required fields
      const requiredFields = ['name', 'address', 'type']
      const missingFields = requiredFields.filter(field => !locationData[field])
      
      if (missingFields.length > 0) {
        return {
          success: false,
          data: null,
          message: `Missing required fields: ${missingFields.join(', ')}`
        }
      }

      const response = await api.post('/locations', locationData)
      return {
        success: true,
        data: response.data,
        message: 'Location created successfully'
      }
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to create location',
        error: error
      }
    }
  },

  // Update location
  updateLocation: async (id, locationData) => {
    try {
      if (!id) {
        return {
          success: false,
          data: null,
          message: 'Location ID is required for update'
        }
      }

      const response = await api.put(`/locations/${id}`, locationData)
      return {
        success: true,
        data: response.data,
        message: 'Location updated successfully'
      }
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to update location',
        error: error
      }
    }
  },

  // Delete location
  deleteLocation: async (id) => {
    try {
      if (!id) {
        return {
          success: false,
          message: 'Location ID is required for deletion'
        }
      }

      await api.delete(`/locations/${id}`)
      return {
        success: true,
        message: 'Location deleted successfully'
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to delete location',
        error: error
      }
    }
  }
}
